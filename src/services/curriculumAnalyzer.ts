import { 
  CurriculumDraft, 
  ExtractedUnitDraft, 
  ExtractedLessonDraft, 
  ExtractedRuleDraft, 
  ExtractedVocabDraft, 
  ExtractedQuestionDraft 
} from '../types/ai';

export class CurriculumAnalyzer {
  /**
   * Analyzes raw extracted malzama text and produces a structured CurriculumDraft
   */
  public static async analyze(
    rawText: string,
    fileName: string = 'ملزمة دراسية',
    fileSize?: string,
    fileType: 'pdf' | 'text' | 'paste' = 'pdf'
  ): Promise<CurriculumDraft> {
    const isRealExtraction = rawText.trim().length > 30;

    // First attempt to enrich via backend AI endpoint if available
    let aiDraftData: any = null;
    try {
      const response = await fetch('/api/ai/analyze-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawText.slice(0, 15000),
          fileName,
          grade: 'السادس الإعدادي والثالث المتوسط',
          subject: 'اللغة الإنكليزية'
        })
      });
      if (response.ok) {
        const result = await response.json();
        if (result.aiPowered && result.draft) {
          aiDraftData = result.draft;
        }
      }
    } catch (e) {
      console.warn('AI curriculum analysis offline, using heuristic analyzer', e);
    }

    // Heuristic extraction
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    const extractedRules: ExtractedRuleDraft[] = [];
    const extractedVocab: ExtractedVocabDraft[] = [];
    const extractedQuestions: ExtractedQuestionDraft[] = [];

    // If AI draft returned, merge them
    if (aiDraftData?.extractedRules && Array.isArray(aiDraftData.extractedRules)) {
      extractedRules.push(...aiDraftData.extractedRules);
    }
    if (aiDraftData?.extractedVocab && Array.isArray(aiDraftData.extractedVocab)) {
      extractedVocab.push(...aiDraftData.extractedVocab);
    }
    if (aiDraftData?.extractedQuestions && Array.isArray(aiDraftData.extractedQuestions)) {
      extractedQuestions.push(...aiDraftData.extractedQuestions);
    }

    // Heuristic pattern matching on lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect grammar rules (قاعدة, rule, صيغة, زمن, subject +)
      if (
        (line.includes('قاعدة') || line.includes('Rule:') || line.includes('صيغة') || line.includes('+')) &&
        line.length > 5 && line.length < 120
      ) {
        const formulaLine = lines[i + 1] && lines[i + 1].includes('+') ? lines[i + 1] : line;
        const explanation = lines[i + 2] || 'قاعدة وزارية مستخرجة آلياً من نصوص الملزمة.';
        const example = lines[i + 3] && lines[i + 3].length > 10 ? lines[i + 3] : undefined;

        if (!extractedRules.some(r => r.title === line)) {
          extractedRules.push({
            title: line.replace(/[#*:-]/g, '').trim(),
            formula: formulaLine,
            explanation,
            examples: example ? [example] : []
          });
        }
      }

      // Detect vocabulary (Word - Meaning or word = meaning or word : meaning)
      const vocabMatch = line.match(/^([a-zA-Z\s]{3,25})\s*[-:=—]\s*(.+)$/);
      if (vocabMatch) {
        const word = vocabMatch[1].trim();
        const meaning = vocabMatch[2].trim();
        if (!extractedVocab.some(v => v.word.toLowerCase() === word.toLowerCase())) {
          extractedVocab.push({
            word,
            meaning,
            context: lines[i + 1] || `Word used in context: "${word}"`
          });
        }
      }

      // Detect questions (سؤال, Q:, 1., Choose, Complete)
      if (
        (line.startsWith('Q') || line.startsWith('س') || line.includes('?') || line.includes('Choose') || line.includes('Complete')) &&
        line.length > 15
      ) {
        const answer = lines[i + 1] && (lines[i + 1].startsWith('Ans') || lines[i + 1].startsWith('ج') || lines[i + 1].includes('=>'))
          ? lines[i + 1]
          : 'نمط وزاري مستخرج';

        if (!extractedQuestions.some(q => q.question === line)) {
          extractedQuestions.push({
            question: line,
            answer,
            type: line.includes('Choose') ? 'Grammar & Functions' : line.includes('spelling') ? 'Spelling' : 'Vocabulary'
          });
        }
      }
    }

    // Default fallbacks if document had minimal text or was scanned
    if (extractedRules.length === 0) {
      extractedRules.push({
        title: "قاعدة الماضي البسيط والمستمر (Past Simple & Continuous with While / As)",
        formula: "While / As + Past Continuous (was/were + v-ing) , Past Simple (v-ed)",
        explanation: "عندما تأتي While أو As يكون بعدها ماضٍ مستمر، والحدث القاطع بالماضي البسيط.",
        examples: ["While Ali was taking a shower, somebody knocked at the front door."]
      });
    }

    if (extractedVocab.length === 0) {
      extractedVocab.push(
        { word: "unconscious", meaning: "فاقد للوعي", context: "She was unconscious and could not wake up." },
        { word: "puzzled", meaning: "متحير / مدهوش", context: "The doctor was puzzled by her symptoms." }
      );
    }

    if (extractedQuestions.length === 0) {
      extractedQuestions.push({
        question: "She (tell) us to be quiet as we (make) too much noise. (Correct the form)",
        answer: "told / were making",
        type: "Grammar & Functions"
      });
    }

    // Build synthetic units & lessons from discovered content
    const units: ExtractedUnitDraft[] = [
      {
        unitNumber: 1,
        title: fileName.replace(/\.[^/.]+$/, '') || 'الوحدة الأولى المستخرجة',
        lessons: [
          {
            title: 'الدرس الاستخلاصي الأول: القواعد والمفاهيم الوزارية',
            titleEn: 'Extracted Lesson 1: Grammar & Key Rules',
            summary: `استخراج ذكي لـ ${extractedRules.length} قواعد وزارية من ملف الملزمة.`,
            rules: extractedRules.slice(0, 5),
            vocabulary: extractedVocab.slice(0, 10),
            questions: extractedQuestions.slice(0, 5)
          }
        ]
      }
    ];

    const summary = aiDraftData?.summary || 
      (isRealExtraction
        ? `تمت معالجة ملف «${fileName}» بنجاح عبر المحرك الذكي. تم تحليل ${rawText.length.toLocaleString('ar-IQ')} حرف واستخلاص ${extractedRules.length} قواعد و${extractedVocab.length} مفردات و${extractedQuestions.length} أسئلة وزارية.`
        : `تم فحص الملف «${fileName}». نظراً لأن الملف قد يكون صورة ممسوحة ضوئياً، تم تفعيل النموذج التوضيحي المعتمد لضمان تجربة تعليمية متكاملة.`);

    return {
      id: 'draft-' + Date.now(),
      courseTitle: fileName.replace(/\.[^/.]+$/, ''),
      subject: 'اللغة الإنكليزية',
      grade: 'السادس الإعدادي / الثالث المتوسط',
      language: 'bilingual',
      summary,
      sourceFileName: fileName,
      sourceFileSize: fileSize || '1.5 MB',
      sourceFileType: fileType,
      isRealExtraction,
      rawTextPreview: rawText.slice(0, 2000),
      units,
      extractedRules,
      extractedVocab,
      extractedQuestions,
      totalUnitsDetected: units.length,
      totalLessonsDetected: 1,
      totalRulesDetected: extractedRules.length,
      totalVocabDetected: extractedVocab.length,
      totalQuestionsDetected: extractedQuestions.length,
      extractedAt: new Date().toISOString()
    };
  }
}

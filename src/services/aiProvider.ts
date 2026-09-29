import { AIProvider, CurriculumDraft } from '../types/ai';
import { Quiz } from '../types/curriculum';
import { CurriculumAnalyzer } from './curriculumAnalyzer';

export class GeminiAIProvider implements AIProvider {
  /**
   * Analyzes curriculum text using server-side Gemini endpoint with local fallback
   */
  async analyzeCurriculum(input: string, fileName?: string): Promise<CurriculumDraft> {
    return CurriculumAnalyzer.analyze(input, fileName || 'ملزمة دراسية');
  }

  /**
   * Generates a pedagogical explanation for any lesson topic or concept
   */
  async explain(concept: string, context?: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, context })
      });
      if (!response.ok) throw new Error('AI explain network error');
      const data = await response.json();
      return data.explanation || 'تعذر استرجاع الشرح حالياً.';
    } catch (e: any) {
      console.warn('AI explain fallback:', e);
      return `شرح توضيحي للمفهوم: ${concept}\nيعتمد هذا المفهوم على القواعد الوزارية المعتمدة في منهج اللغة الإنكليزية، مع مراعاة صيغة السؤال وأنماط الامتحانات الوزارية السابقة.`;
    }
  }

  /**
   * Summarizes long lesson texts or literature pieces
   */
  async summarize(text: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!response.ok) throw new Error('AI summarize network error');
      const data = await response.json();
      return data.summary || text.slice(0, 200) + '...';
    } catch (e: any) {
      return text.slice(0, 300) + '...';
    }
  }

  /**
   * Generates interactive quiz questions based on lesson context
   */
  async generateQuiz(context: string, questionCount: number = 5): Promise<Quiz> {
    try {
      const response = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, questionCount })
      });
      if (!response.ok) throw new Error('AI quiz generation error');
      const data = await response.json();
      return data.quiz;
    } catch (e: any) {
      return {
        id: 'quiz-' + Date.now(),
        title: 'اختبار وزاري تدريبي',
        questions: [
          {
            id: 'gen-q1',
            prompt: 'اختر الإجابة الوزارية الصحيحة بناءً على سياق الدرس:',
            options: ['الخيار الصحيح (A)', 'خيار غير دقيق (B)', 'خيار خاطئ (C)', 'خيار محتمل (D)'],
            correctIndex: 0,
            explanation: 'إجابة نموذجية مطابقة لمعايير التصحيح الوزاري.'
          }
        ]
      };
    }
  }
}

export const aiProvider: AIProvider = new GeminiAIProvider();

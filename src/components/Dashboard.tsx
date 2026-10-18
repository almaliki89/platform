import React from 'react';
import {
  ArrowLeft, Award, BookOpen, CheckCircle2, FileText, GraduationCap,
  Layers, Play, Sparkles, Target, Trophy
} from 'lucide-react';
import { EducationalGrade, StudentState, Unit, Lesson } from '../types';
import { SubjectId } from '../types/subject';
import { getGradeMeta, getUnitsForGrade } from '../data/gradeContentResolver';
import { PinterestPlatformFeed } from './PinterestPlatformFeed';
import { GradeSelectorBar } from './GradeSelectorBar';

interface DashboardProps {
  studentState: StudentState;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'review') => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
  selectedGrade?: EducationalGrade;
  onSelectGrade?: (grade: EducationalGrade) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentState,
  onSelectLesson,
  onNavigateTab,
  selectedGrade = 'sixth-preparatory',
  onSelectGrade = () => {},
}) => {
  const effectiveGrade = selectedGrade || studentState.selectedGrade || 'sixth-preparatory';
  const gradeMeta = getGradeMeta(effectiveGrade);
  const units = getUnitsForGrade(effectiveGrade);
  const lessons = units.flatMap((unit) => unit.lessons);
  const completedIds = new Set(studentState.completedLessonIds || []);
  const completedCount = lessons.filter((lesson) => completedIds.has(lesson.id)).length;
  const progressPct = lessons.length ? Math.min(100, Math.round((completedCount / lessons.length) * 100)) : 0;
  const lastVisitedLesson = studentState.lastVisitedLessonId
    ? lessons.find((lesson) => lesson.id === studentState.lastVisitedLessonId)
    : undefined;
  const nextLesson = lastVisitedLesson || lessons.find((lesson) => !completedIds.has(lesson.id)) || lessons[0];
  const greetingName = (studentState.name || '').trim().split(/\s+/)[0];

  return (
    <div className="omega-home w-full">
      <GradeSelectorBar selectedGrade={effectiveGrade} onSelectGrade={onSelectGrade} />

      <section className="omega-home-hero" aria-labelledby="omega-home-title" dir="rtl">
        <div className="omega-home-hero-content">
          <div className="omega-hero-eyebrow">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>OMEGA MAX · {gradeMeta.shortName}</span>
          </div>
          <h1 id="omega-home-title">
            {greetingName ? 'أهلاً ' + greetingName + '،' : 'أهلاً بك في'}{' '}
            <span>مسارك نحو إتقان الإنكليزية</span>
          </h1>
          <p>
            تعلّم وفق صفك الدراسي، تابع إنجازك، وانتقل مباشرةً إلى الدرس التالي أو التدريب الذي تحتاجه.
            المحتوى المعروض هنا مرتبط بصف <strong>{gradeMeta.nameAr}</strong>.
          </p>
          <div className="omega-hero-actions">
            <button
              type="button"
              className="omega-primary-action"
              onClick={() => nextLesson && onSelectLesson(nextLesson)}
              disabled={!nextLesson}
            >
              <Play className="w-4 h-4" />
              <span>{lastVisitedLesson ? 'متابعة آخر درس' : 'ابدأ التعلّم'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button type="button" className="omega-secondary-action" onClick={() => onNavigateTab('mock')}>
              <Target className="w-4 h-4" />
              <span>{gradeMeta.isMinisterial ? 'تجربة محاكي الامتحان الوزاري' : 'تجربة الامتحان التدريبي'}</span>
            </button>
          </div>
        </div>

        <aside className="omega-hero-progress" aria-label="ملخص التقدم الدراسي">
          <div className="omega-progress-top">
            <span>إنجاز هذا الصف</span>
            <Award className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="omega-progress-value">
            <strong>{progressPct}</strong><span>%</span>
          </div>
          <div
            className="omega-progress-track"
            role="progressbar"
            aria-label="نسبة إنجاز الدروس"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
          >
            <div className="omega-progress-fill" style={{ width: String(progressPct) + '%' }} />
          </div>
          <span className="omega-progress-note">
            {completedCount} من {lessons.length} درس مكتمل · التقدم محسوب لهذا الصف فقط.
          </span>
        </aside>
      </section>

      <section className="omega-stat-grid" aria-label="إحصائيات التعلّم">
        <div className="omega-stat-card">
          <div className="omega-stat-icon"><BookOpen className="w-5 h-5" /></div>
          <div className="omega-stat-copy">
            <span className="omega-stat-label">دروس الصف</span>
            <strong className="omega-stat-value">{lessons.length}</strong>
            <small className="omega-stat-foot">{units.length} وحدات دراسية</small>
          </div>
        </div>
        <div className="omega-stat-card">
          <div className="omega-stat-icon teal"><CheckCircle2 className="w-5 h-5" /></div>
          <div className="omega-stat-copy">
            <span className="omega-stat-label">الدروس المكتملة</span>
            <strong className="omega-stat-value">{completedCount}</strong>
            <small className="omega-stat-foot">ضمن {gradeMeta.shortName}</small>
          </div>
        </div>
        <div className="omega-stat-card">
          <div className="omega-stat-icon gold"><Trophy className="w-5 h-5" /></div>
          <div className="omega-stat-copy">
            <span className="omega-stat-label">نقاط التعلّم</span>
            <strong className="omega-stat-value">{Math.max(0, studentState.xp || 0).toLocaleString('en-US')}</strong>
            <small className="omega-stat-foot">XP مكتسبة</small>
          </div>
        </div>
        <div className="omega-stat-card">
          <div className="omega-stat-icon violet"><Layers className="w-5 h-5" /></div>
          <div className="omega-stat-copy">
            <span className="omega-stat-label">الوحدات</span>
            <strong className="omega-stat-value">{units.length}</strong>
            <small className="omega-stat-foot">حسب المنهج المختار</small>
          </div>
        </div>
      </section>

      <section aria-labelledby="omega-shortcuts-title">
        <div className="omega-section-heading">
          <div>
            <h2 id="omega-shortcuts-title">اختصارات التعلّم</h2>
            <p>الوصول السريع إلى أهم أدوات الدراسة</p>
          </div>
        </div>
        <div className="omega-shortcuts-grid mt-3">
          <button type="button" className="omega-shortcut-card" onClick={() => onNavigateTab('review')}>
            <span className="omega-shortcut-icon"><Sparkles className="w-5 h-5" /></span>
            <span><strong>المراجعة المركّزة</strong><small>راجع النقاط التي تحتاج تثبيتها</small></span>
          </button>
          <button type="button" className="omega-shortcut-card" onClick={() => onNavigateTab('exam')}>
            <span className="omega-shortcut-icon teal"><FileText className="w-5 h-5" /></span>
            <span><strong>{gradeMeta.isMinisterial ? 'بنك الأسئلة الوزارية' : 'بنك أسئلة التدريب'}</strong><small>تدرّب على الأسئلة المتاحة للصف</small></span>
          </button>
          <button type="button" className="omega-shortcut-card" onClick={() => onNavigateTab('literature')}>
            <span className="omega-shortcut-icon gold"><BookOpen className="w-5 h-5" /></span>
            <span><strong>القراءة والأدب</strong><small>قصص ونصوص ومراجعة</small></span>
          </button>
          <button type="button" className="omega-shortcut-card" onClick={() => onNavigateTab('essays')}>
            <span className="omega-shortcut-icon violet"><GraduationCap className="w-5 h-5" /></span>
            <span><strong>الإنشاء والتعبير</strong><small>تدرّب على كتابة موضوعك</small></span>
          </button>
        </div>
      </section>

      <div className="omega-feed-wrap">
        <PinterestPlatformFeed
          selectedGrade={effectiveGrade}
          onSelectGrade={onSelectGrade}
          onSelectLesson={onSelectLesson}
          onNavigateTab={onNavigateTab}
          studentState={studentState}
        />
      </div>
    </div>
  );
};

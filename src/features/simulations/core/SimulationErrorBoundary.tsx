import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class SimulationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Simulation Runtime Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-8 text-center shadow-md space-y-4">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {this.props.fallbackTitle || 'تعذر تشغيل المحاكاة على هذا الجهاز'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            يمكنك متابعة شرح الدرس والنتائج الرقمية والمعادلات الموضحة، أو الضغط على إعادة المحاولة.
          </p>
          <div className="pt-2">
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة تشغيل المحاكاة</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

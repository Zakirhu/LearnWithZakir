import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DoubtQuery, QuizAttempt, StudentProfile } from '../types';

// Read Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    !supabaseUrl.includes('your-project-id') &&
    supabaseUrl.startsWith('https://')
  );
};

// Create Supabase Client instance (with dummy fallback client if not configured yet)
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

/**
 * Syncs the student profile to Supabase 'profiles' table
 */
export async function syncProfileToSupabase(profile: StudentProfile): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        email: profile.email,
        name: profile.name,
        class_level: profile.classLevel,
        avatar_seed: profile.avatarSeed,
        target_exam_year: profile.targetExamYear,
        enrolled_subjects: profile.enrolledSubjects,
        bookmarks: profile.bookmarks,
        bookmarked_questions: profile.bookmarkedQuestions,
        badges: profile.badges,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' });

    if (error) {
      console.warn('Supabase profile sync warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error syncing profile with Supabase:', err);
    return false;
  }
}

/**
 * Saves a quiz attempt to Supabase 'quiz_attempts' table
 */
export async function saveQuizAttemptToSupabase(attempt: QuizAttempt, userEmail: string = 'student@zakirhub.edu'): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('quiz_attempts')
      .insert({
        id: attempt.id,
        user_email: userEmail,
        quiz_id: attempt.quizId,
        quiz_title: attempt.quizTitle,
        class_level: attempt.classLevel,
        subject_id: attempt.subjectId,
        chapter_title: attempt.chapterTitle,
        mode: attempt.mode,
        score: attempt.score,
        total_marks: attempt.totalMarks,
        percentage: attempt.percentage,
        time_spent_seconds: attempt.timeSpentSeconds,
        total_questions: attempt.totalQuestions,
        correct_answers_count: attempt.correctAnswersCount,
        user_answers: attempt.userAnswers,
        created_at: attempt.date
      });

    if (error) {
      console.warn('Supabase quiz attempt save warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving quiz attempt to Supabase:', err);
    return false;
  }
}

/**
 * Submits a doubt query to Supabase 'doubt_queries' table
 */
export async function submitDoubtToSupabase(doubt: DoubtQuery): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('doubt_queries')
      .insert({
        id: doubt.id,
        student_name: doubt.studentName,
        student_class: doubt.studentClass,
        subject: doubt.subject,
        topic: doubt.topic,
        query: doubt.query,
        status: doubt.status,
        reply: doubt.reply,
        created_at: doubt.timestamp
      });

    if (error) {
      console.warn('Supabase doubt submission warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error submitting doubt to Supabase:', err);
    return false;
  }
}

/**
 * Fetches recent doubt queries from Supabase
 */
export async function fetchDoubtsFromSupabase(): Promise<DoubtQuery[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('doubt_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      studentName: d.student_name,
      studentClass: d.student_class,
      subject: d.subject,
      topic: d.topic,
      query: d.query,
      timestamp: d.created_at,
      status: d.status,
      reply: d.reply
    }));
  } catch (err) {
    console.warn('Error fetching doubts from Supabase:', err);
    return null;
  }
}

/**
 * Saves uploaded PDF Chapter & extracted MCQs to Supabase 'pdf_chapters' table
 */
export async function savePdfChapterToSupabase(data: {
  id?: string;
  fileName: string;
  classLevel: string;
  subjectId: string;
  chapterTitle: string;
  questionCount: number;
  extractedQuestions: any[];
  pdfDataUrl?: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const recordId = data.id || `pdf-ch-${Date.now()}`;
    const { error } = await supabase
      .from('pdf_chapters')
      .upsert({
        id: recordId,
        file_name: data.fileName,
        class_level: data.classLevel,
        subject_id: data.subjectId,
        chapter_title: data.chapterTitle,
        question_count: data.questionCount,
        extracted_questions: data.extractedQuestions,
        pdf_data_url: data.pdfDataUrl || null,
        created_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase PDF chapter save warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving PDF chapter to Supabase:', err);
    return false;
  }
}

/**
 * Fetches all saved PDF chapters & extracted MCQs from Supabase 'pdf_chapters' table
 */
export async function fetchPdfChaptersFromSupabase(): Promise<any[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('pdf_chapters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.warn('Error fetching PDF chapters from Supabase:', err);
    return null;
  }
}


interface Discover {
  page: Number;
  results: Results[];
  total_pages: Number;
  total_results: Number;
}

interface Results {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Number[];
  id: Number;
  runtime?: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: Number;
}

interface CreditsType {
  id: number;
  cast: Cast[];
}

interface Cast {
  adult: boolean;
  gender: boolean;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

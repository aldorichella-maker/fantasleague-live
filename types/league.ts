export interface League {
  id: number;
  league: string;

  // Logo del campionato (piccolo)
  leagueLogo: string;

  sponsor: string;

  // Logo sponsor (grande)
  logo: string;

  teams: string[];
}
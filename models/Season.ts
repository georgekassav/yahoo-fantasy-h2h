export type Season = {
  gameKey: string;
  gameID: string;
  name: string;
  code: string;
  type: string;
  url: string;
  season: string;
  isRegistrationOver: string;
  isGameOver: string;
  isOffseason: string;
  teams: Teams;
  editorialSeason?: string;
  picksStatus?: string;
  contestGroupID?: string;
  scenarioGenerator?: string;
};

type Teams = {
  team: Team[];
};

type Team = {
  team_key: string;
  team_id: string;
  name: string;
  is_owned_by_current_login: string;
  url: string;
  team_logos: {
    team_logo: {
      size: string;
      url: string;
    };
  };
  waiver_priority: string;
  number_of_moves: string;
  number_of_trades: string;
  roster_adds: {
    coverage_type: string;
    coverage_value: string;
    value: string;
  };
  clinched_playoffs: string;
  league_scoring_type: string;
  draft_position: string;
  has_draft_grade: string;
  managers: {
    manager: {
      manager_id: string;
      nickname: string;
      guid: string;
      is_commissioner: string;
      is_current_login: string;
      email: string;
      image_url: string;
      felo_score: string;
      felo_tier: string;
    };
  };
};

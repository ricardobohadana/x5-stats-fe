export interface Champion {
  readonly id:                 number;
  readonly name:               string;
  readonly alias:              string;
  readonly squarePortraitPath: string;
  readonly roles:              Role[];
}

export enum Role {
  Assassin = "assassin",
  Fighter = "fighter",
  Mage = "mage",
  Marksman = "marksman",
  Support = "support",
  Tank = "tank",
}

const isChampion = (obj: unknown): obj is Champion => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const champion = obj as Champion;
  return (
    typeof champion.id === 'number' &&
    typeof champion.name === 'string' &&
    typeof champion.alias === 'string'
  );
};

export const assertIsChampionArray = (input: unknown): input is Champion[] => {
  if (!Array.isArray(input) || !input.every(isChampion)) {
    return false;
  }
  return true;
}

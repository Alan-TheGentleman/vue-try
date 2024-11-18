export enum Status {
  ALIVE = 'alive',
  DEAD = 'dead',
  UNKNOWN = 'unknown',
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
  GENDERLESS = 'genderless',
  UNKNOWN = 'unknown',
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: Status
  species: string
  type: string
  gender: Gender
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export const EmptyCharacter: Character = {
  id: 0,
  name: '',
  status: Status.UNKNOWN,
  species: '',
  type: '',
  gender: Gender.UNKNOWN,
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [],
  url: '',
  created: '',
}

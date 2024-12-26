export type Category = {
  id: number;
  name: string;
};

export type Consulting = {
  id: number;
  category?: string;
  title: string;
  date: string;
  time?: string;
  manager?: string;
  status: boolean;
  contents?: string;
  journalProducts?: Item[];
};

// Journal Products
export type Item = {
  id: number;
  name: string;
  url: string;
};

export type Script = {
  sequence: number;
  speaker: string;
  content: string;
};

export type Info = {
  pbName: string;
  vipName: string;
};

export type Reservation = {
  id: number;
  title: string;
  categoryName?: string;
  date: string;
  time: string;
  content?: string;
  customerName?: string;
  pbName?: string;
};

export type Notification = {
  id: number;
  title: string;
  text: string;
  read: boolean;
};

export type PBProfile = {
  name: string;
  introduction: string;
  date: string;
  location: string;
  tel: string;
  career: string;
  imageUrl: string;
  tags: string[];
  online: boolean;
};

export type Recommendation = {
  id: number;
  imgUrl: string;
  description: string;
  url: string;
};

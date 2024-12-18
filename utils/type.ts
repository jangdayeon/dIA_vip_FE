export type reserve = {
  title: string;
  category: string;
  date: string;
  time: string;
  detail: string;
};

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
  journalProducts?: item[];
};

// recommendation
export type item = {
  id: number;
  name: string;
  url: string;
};

export type Script = {
    sequence: number;
    speaker: string;
    content: string;
  };

// schedule
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

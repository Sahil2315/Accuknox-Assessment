export type widgetTS = {
  name: string;
  text: string;
  checked: boolean;
};

export type categoryTS = {
  name: string;
  displayName: string;
  widgets: widgetTS[];
};

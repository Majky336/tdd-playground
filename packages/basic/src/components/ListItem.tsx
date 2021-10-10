import { FC } from "react";
import { TListItem } from "../types/TListItem";

export type ListItemProps = {
  item: TListItem;
};

export const ListItem: FC<ListItemProps> = () => {
  return <div>I am list item</div>;
};

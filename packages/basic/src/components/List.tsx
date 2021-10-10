import { FC } from "react";
import { TListItem } from "../types/TListItem";
import { ListItem } from "./ListItem";

export type ListProps = {
  items: TListItem[];
  title?: string;
};

export const List: FC<ListProps> = ({
  items,
  title = "Default list title",
}) => {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <ListItem item={item} />
      ))}
    </div>
  );
};

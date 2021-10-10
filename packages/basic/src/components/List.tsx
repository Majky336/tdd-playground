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
  const renderItems = (listItems: TListItem[]) => {
    if (listItems.length === 0) {
      return <div id="empty-list-message">The list is empty</div>;
    }

    return listItems.map((item) => <ListItem key={item.id} item={item} />);
  };

  return (
    <div id="list">
      <h3 id="list-title">{title}</h3>
      <div id="list-items">{renderItems(items)}</div>
    </div>
  );
};

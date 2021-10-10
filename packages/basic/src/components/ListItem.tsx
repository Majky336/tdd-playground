import { FC } from "react";
import { TListItem } from "../types/TListItem";

export type ListItemProps = {
  item: TListItem;
};

export const ListItem: FC<ListItemProps> = ({ item }) => {
  return (
    <div>
      <div>{`TODO #${item.id} - ${item.name}`}</div>
      <div>
        <b>{item.status}</b>
      </div>
    </div>
  );
};

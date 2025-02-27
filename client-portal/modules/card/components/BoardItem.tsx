import {
  Content,
  ItemDate,
  ItemFooter,
  ItemWrapper,
  Right,
  Wrapper,
} from "../../styles/tasks";

import EmptyState from "../../common/form/EmptyState";
import PriorityIndicator from "../../common/PriorityIndicator";
import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {
  items: any;
};

function BoardItem({ items }: Props) {
  const router = useRouter();
  const { stageId } = router.query as any;

  const renderDate = (date) => {
    if (!date) {
      return null;
    }

    return <ItemDate>{dayjs(date).format("MMM D, YYYY")}</ItemDate>;
  };

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon="ban"
        text="There is no cards in this stage"
        size="small"
      />
    );
  }

  return (
    <Wrapper>
      {items.map((task) => (
        <ItemWrapper
          key={task._id}
          onClick={() =>
            router.push(`/publicTasks?stageId=${stageId}&itemId=${task._id}`)
          }
        >
          <Content>
            <h5>
              {task.priority && <PriorityIndicator value={task.priority} />}{" "}
              {task.name}
            </h5>
            <p>{task.description}</p>
          </Content>
          <ItemFooter>
            Last updated:
            <Right>{renderDate(task.modifiedAt)}</Right>
          </ItemFooter>
        </ItemWrapper>
      ))}
    </Wrapper>
  );
}

export default BoardItem;

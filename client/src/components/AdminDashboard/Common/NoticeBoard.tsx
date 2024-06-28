import React from "react";
import { Card, List, Avatar, Typography } from "antd";

const { Title } = Typography;

const notices = [
  {
    name: "Airi Satou",
    time: "7 hours ago",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.",
  },
  {
    name: "Sarah Smith",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.",
  },
  {
    name: "Cara Stevens",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.",
  },
  {
    name: "Ashton Cox",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=4",
    description: "Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.",
  },
  {
    name: "Mark Hay",
    time: "2 days ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    description: "Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.",
  },
];

const NoticeBoard: React.FC = () => {
  return (
    <Card>
      <Title level={4}>Recent Activity</Title>
      <List
        itemLayout="horizontal"
        dataSource={notices}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
            <div>{item.time}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default NoticeBoard;

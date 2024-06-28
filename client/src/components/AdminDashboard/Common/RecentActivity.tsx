import React from "react";
import { Card, Avatar } from "antd";
import { Flex } from "antd";
import Meta from "antd/lib/card/Meta";

const RecentActivityCard: React.FC = () => {
  return (
    <Card>
      <Meta title="Recent Activity" />

      <h4>Biruk Added an Employee</h4>
      <Flex vertical={false} gap="large" justify="center" align="center">
        <Avatar src="https://media.istockphoto.com/id/1421619596/photo/colorful-handcrafted-soaps.webp?b=1&s=170667a&w=0&k=20&c=BcPyttpEFTnaLg2b0XKPIaIiF3xMzhnvgEmguQVz7xE=" />
        <p>Mulualem Asfaw</p> <p>- 1m ago</p>
      </Flex>

      <h4>Abebe Added an Employee</h4>
      <Flex vertical={false} gap="large" justify="center" align="center">
        <Avatar src="https://media.istockphoto.com/id/1421619596/photo/colorful-handcrafted-soaps.webp?b=1&s=170667a&w=0&k=20&c=BcPyttpEFTnaLg2b0XKPIaIiF3xMzhnvgEmguQVz7xE=" />
        <p>Abdisa Chala</p> <p>- 3m ago</p>
      </Flex>

      <h4>Meron Added an Employee</h4>
      <Flex vertical={false} gap="large" justify="center" align="center">
        <Avatar src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" />
        <p>Aster Yifruh</p> <p>- 12m ago</p>
      </Flex>

      <h4>Megersa Added an Employee</h4>
      <Flex vertical={false} gap="large" justify="center" align="center">
        <Avatar src="https://media.istockphoto.com/id/173240129/photo/gun-with-clipping-path.webp?b=1&s=170667a&w=0&k=20&c=GfEthUuCO-EjpItsQ3bxRUYhQdjAbNbGxYAwpw_pcW4=" />
        <p>Melaku Abebe</p> <p>- 20m ago</p>
      </Flex>
    </Card>
  );
};

export default RecentActivityCard;

import React from 'react'
import Title from "antd/lib/typography/Title";
import { Layout } from "antd";
import AppraisalListCandidateTable from '../../components/Appraisal/AppraisalListCandidateTable';
import AppraisalHistory from '../../components/Appraisal/AppraisalHistory';
const { Content } = Layout;

function AppraisalPage() {
  return (
    <>
     <Title level={4} style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}>
        List of candidates
      </Title>
      <Layout>
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: "0 24px", minHeight: 360}}
          >
            <AppraisalHistory />
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default AppraisalPage

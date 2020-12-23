import React from 'react';
import { Spin } from 'antd';
import {Loading3QuartersOutlined} from "@ant-design/icons";

export default function LoadingIndicator() {
    const antIcon = <Loading3QuartersOutlined style={{ fontSize: 30 }} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}
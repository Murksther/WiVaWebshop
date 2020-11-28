import React from 'react';
import { Spin } from 'antd';
import Icon from "@ant-design/icons";

export default function LoadingIndicator() {
    const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}
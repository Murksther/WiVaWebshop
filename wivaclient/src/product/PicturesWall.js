import React, { Component } from 'react';
import { getBase64 } from '../util/Utils';
import './PicturesWall.css';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    preventAction = () =>{
        return false
    }

    render() {
        const { previewVisible, previewImage, previewTitle } = this.state;
        const fileList = this.props.fileList;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    beforeUpload={this.preventAction}
                    accept={".png,.jpg,.jpeg"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.props.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
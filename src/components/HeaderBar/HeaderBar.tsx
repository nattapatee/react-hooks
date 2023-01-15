import { SearchOutlined, UserOutlined, BellOutlined, MessageOutlined, AppstoreOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive'
import '../../css/Header.css';
import React, { useState } from 'react';
const { Header, Content, Footer } = Layout;

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}

const HeaderBar: React.FC<HeaderProps> = (props) => {
    const [keyword, setKeyword] = useState('');
    const [onSearch, setOnSearch] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleSearch = (e: any) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.onSearch(keyword);
    };

    return (
        <Header className='header'>
            <img src={require("../../images/Facebook_f_logo_(2021).svg.png")} className="logo" />
            {onSearch && isMobile ?
                <>
                    <Input
                        placeholder='ค้นหา'
                        prefix={<SearchOutlined />}
                        onChange={handleSearch}
                        className="search-box-mobile"
                        onPressEnter={handleSubmit}
                        allowClear
                    />
                    <Button shape="circle" icon={<CloseOutlined />} onClick={() => setOnSearch(false)} className="close-search" />

                </>
                :
                <>
                    {
                        isMobile ?
                            <Button shape="circle" icon={<SearchOutlined />} size="large" onClick={() => setOnSearch(true)} className='search-button' />
                            :
                            <Input
                                placeholder='ค้นหา'
                                prefix={<SearchOutlined />}
                                onChange={handleSearch}
                                className="search-box"
                                onPressEnter={handleSubmit}
                                allowClear
                            />
                    }
                    <Avatar size="large" icon={<UserOutlined />} className="avatar-profile" />
                    <Button shape="circle" icon={<BellOutlined />} size="large" className="tools-profile" />
                    <Button shape="circle" icon={<MessageOutlined />} size="large" className="tools-profile" />
                    <Button shape="circle" icon={<AppstoreOutlined />} size="large" className="tools-profile" />
                </>
            }
        </Header>
    );
}
export default HeaderBar;

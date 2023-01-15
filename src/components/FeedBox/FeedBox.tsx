import moment from 'moment';
import React, { useState } from 'react';
import { newsFeed } from '../../shared/useFetchNews';
import '../../css/FeedBox.css';
import { Avatar, Card, Col, Row, Skeleton } from 'antd';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RecommendIcon from '@mui/icons-material/Recommend';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;


interface FeedBoxProps {
    feedData: newsFeed | null;
}

const FeedBox: React.FC<FeedBoxProps> = ({ feedData }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return feedData ? (
        <div className="feedbox">
            <div className="avatar-box">
                <Avatar size="large" icon={<UserOutlined />} className="avatarBox" style={{ display: 'inline-block' }} />
                <div className="avatar-info" style={{ display: 'inline-block' }}>
                    <p className="author" style={{ margin: 0 }}>{feedData.author || "ไม่พบผู้แต่ง"}</p>
                    <p className="date" style={{ margin: 0 }}>{moment(feedData.publishedAt).fromNow()}</p>
                </div>
            </div>
            <span>{feedData.title}...</span>
            <a href={feedData.url} target="_blank">อ่านต่อ
                <Card
                    hoverable
                    className='feed-news-box'
                    cover={<img alt="example" src={feedData.urlToImage} />}
                >
                    <span></span>
                    <Meta title={feedData.title} description={feedData.description} />
                </Card>
            </a>



            <div className='footer-status'>
                <div className="count-status">
                    {isLiked && <>
                        <RecommendIcon style={{ color: "#1890ff", marginRight: 5 ,marginTop: 5}} /><span>1</span>
                    </>}
                </div>
                <hr className="lineStatus" />

                <Row>
                    <Col span={8} className={`boxStatus ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
                        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />} <span className='textStatus'>ถูกใจ</span>
                    </Col>
                    <Col span={8} className="boxStatus" >
                        <ChatBubbleOutlineIcon /><span className='textStatus'>แสดงความเห็น</span>
                    </Col>
                    <Col span={8} className="boxStatus" >
                        <ReplyIcon /><span className='textStatus'>แชร์</span>
                    </Col>
                </Row>
            </div>
        </div>
    ) : (
        <div className="feedbox">
            <Skeleton active avatar paragraph={{ rows: 4 }} />
            <Card
                    hoverable
                    className='feed-news-box'
                    cover={<Skeleton.Image active />}
                >
                    <span></span>
                    <Meta title={null} description={<Skeleton active/>} />
                </Card>


            <div className='footer-status'>
                <div className="count-status">
                    {isLiked && <>
                        <RecommendIcon style={{ color: "#1890ff", marginRight: 5 ,marginTop: 5}} /><span>1</span>
                    </>}
                </div>
                <hr className="lineStatus" />

                <Row>
                    <Col span={8} className={`boxStatus ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
                        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />} <span className='textStatus'>ถูกใจ</span>
                    </Col>
                    <Col span={8} className="boxStatus" >
                        <ChatBubbleOutlineIcon /><span className='textStatus'>แสดงความเห็น</span>
                    </Col>
                    <Col span={8} className="boxStatus" >
                        <ReplyIcon /><span className='textStatus'>แชร์</span>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default FeedBox;

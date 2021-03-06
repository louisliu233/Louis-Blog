import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Col, Row, List, Divider,  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Avthor'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import { FireOutlined, CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import '../styles/pages/index.css'
import servicePath from '../config/apiUrl'

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  return (
      <>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
        <List 
            header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className='list-title'>
                <Link href={{pathname:'/detailed', query:{id:item.id}}} >
                <a>{item.title}</a>
                </Link>
                </div>
                <div className='list-icon'>
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
        />   
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
        </Col>
      </Row>
      <Footer />
      </>
  )
}

Home.getInitialProps = async ()=>{
  
  return await axios(servicePath.getArticleList).then(
      res=>res.data
    )
}
  

export default Home
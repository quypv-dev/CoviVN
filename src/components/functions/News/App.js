import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useForceUpdate from 'use-force-update'
import newsApi from '../../../api/newsApi'
import Article from '../../Article'
import Header from '../../Header'
import customize from '../../../styles/customize'
import '../../../styles/index.css'
import { Windmill } from '@windmill/react-ui'

function App() {
  const forceUpdate = useForceUpdate()

  const [news, setNews] = useState([])
  const [category, setCategory] = useState('suc-khoe')
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchNews = async () => {
      const response = await newsApi.getNewsByCategory(category, {
        page,
        size: 10,
      })
      setNews([...new Set([...news, ...response])])
    }
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page])

  const onChangeCategory = (data) => {
    if (category === data) {
      forceUpdate()
    } else {
      setNews([])
      setPage(0)
      setCategory(data)
    }
  }

  return (
    <React.Fragment>
        <Windmill theme={customize}>

      <Header onChangeCategory={onChangeCategory} />
      <div className="mt-20">
        <InfiniteScroll
          dataLength={news.length}
          next={() => setPage((page) => page + 1)}
          hasMore={true}>
          {news.map((item, index) => (
            <Article key={index} article={item} />
          ))}
        </InfiniteScroll>
      </div>
      </Windmill>,

    </React.Fragment>
  )
}

export default App
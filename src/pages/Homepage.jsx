import '../style/home-page.scss'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArticleCard from '../components/Articlecard'
import { fetchArticles, setCurrentPage } from '../store/dataSlice'

function HomePage() {
  const dispatch = useDispatch()
  const { currentPage, totalAticles, data: articles, articlesStatus } = useSelector((state) => state.data)
  // const error = useSelector((state) => state.data.error)

  useEffect(() => {
    if (articlesStatus === 'idle') {
      dispatch(fetchArticles())
    }
    return () => {
      dispatch({ type: 'data/clearCurrentArticles' })
    }
  }, [])

  if (articlesStatus !== 'succeeded') {
    return <p>Loading...</p>
  }

  const handelPagination = (page) => {
    const offset = (page - 1) * 10
    dispatch(fetchArticles(offset))
    dispatch(setCurrentPage(page))
  }

  return (
    <div className="home-page">
      <h1>Homepage</h1>
      <ul>
        {articles.map((article) => {
          if (!article) return null
          return (
            <li key={article.slug}>
              <ArticleCard content={article} />
            </li>
          )
        })}
      </ul>
      <Pagination
        defaultCurrent={currentPage}
        pageSize={10}
        total={totalAticles}
        showSizeChanger={false}
        className="home-page__pagination"
        onChange={handelPagination}
      />
    </div>
  )
}

export default HomePage

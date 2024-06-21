import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Createarticle from '../components/Createarticle'
import { fetchArticle } from '../store/dataSlice'

function EditArticlePage() {
  const articleStatus = useSelector((state) => state.data.articleStatus)
  const article = useSelector((state) => state.data.currentArticle)
  const dispatch = useDispatch()

  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticle(slug))
    return () => {
      dispatch({ type: 'data/clearCurrentArticle' })
    }
  }, [])

  return (
    <div className="create-article">
      <Createarticle editMode article={article} articleStatus={articleStatus} />
    </div>
  )
}

export default EditArticlePage

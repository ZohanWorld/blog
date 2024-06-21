/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { useNavigate, useParams } from 'react-router-dom'
import '../style/article-page.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToFavourite, deleteArticle, fetchArticle, removeFromFavourite } from '../store/dataSlice'
import ModalWindow from '../components/Modalwindow'

function ArticlePage() {
  const [showModal, setShowModal] = useState(false)
  const articleStatus = useSelector((state) => state.data.articleStatus)
  const article = useSelector((state) => state.data.currentArticle)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const { slug } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchArticle(slug))
    }
    return () => {
      dispatch({ type: 'data/clearCurrentArticle' })
    }
  }, [])

  if (articleStatus !== 'succeeded') {
    return <p>Loading...</p>
  }

  if (!article || !article.author) {
    return <p>Article not found</p>
  }

  const isUserAuthor = user && user.username === article.author.username

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`)
  }

  const handleDelete = () => {
    dispatch(deleteArticle(slug))
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleFavourite = () => {
    if (user) {
      if (article.favorited) {
        dispatch(removeFromFavourite(article.slug))
        return
      }
      dispatch(addToFavourite(article.slug))
    }
  }

  return (
    <div className="article-page">
      <article className="article">
        <div className="article-info">
          <div className="article-info__title">
            <div className="article-info__title-text">
              <h2>{article.title}</h2>
              <label htmlFor="likes" className="article-info__likes">
                <button
                  type="button"
                  id="likes"
                  className={`article-info__likes-button${article.favorited ? '--full' : ''}`}
                  onClick={handleFavourite}
                />
                {article.favoritesCount}
              </label>
            </div>
            {article.tagList.map((value, index) => {
              return (
                <span className="arcticle-info__tag" key={value + index}>
                  {value}
                </span>
              )
            })}
            <p className="article-info__description">{article.description}</p>
          </div>
          <div className="author">
            <div className="author__block">
              <div className="author__info">
                <p className="author__name">{article.author.username}</p>
                <p className="author__date">Feb 22, 2020</p>
              </div>
              <img src={article.author.image} alt="Article" className="author__avatar" />
            </div>
            {isUserAuthor && (
              <div className="author__btns">
                <button type="button" className="author__btn author__btn--delete" onClick={openModal}>
                  DELETE
                </button>
                <button type="button" className="author__btn author__btn--edit" onClick={handleEdit}>
                  EDIT
                </button>
                {showModal && <ModalWindow closeModal={closeModal} handleAction={handleDelete} showModal={showModal} />}
              </div>
            )}
          </div>
        </div>
        <p>{article.body}</p>
      </article>
    </div>
  )
}

export default ArticlePage

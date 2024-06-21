/* eslint-disable prefer-rest-params */
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from 'react-redux'
import '../style/create-article.scss'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { createArticle, updateArticle } from '../store/dataSlice'

function CreateArticle({ editMode, article, articleStatus }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { slug } = useParams()

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagList: [''],
      title: '',
      description: '',
      body: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    if (editMode && article) {
      setValue('title', article.title)
      setValue('description', article.description)
      setValue('body', article.body)
      setValue('tagList', article.tagList || [])
    }
  }, [editMode, article, setValue])

  const onSubmit = (data) => {
    const tags = data.tagList.filter((tag) => tag)
    if (editMode) {
      dispatch(updateArticle({ article: data, slug })).then(() => {
        navigate('/')
      })
      return
    }
    dispatch(createArticle({ ...data, tagList: tags })).then(() => {
      navigate('/')
    })
  }

  if (articleStatus !== 'succeeded' && editMode) {
    return <p>Loading...</p>
  }

  if (articleStatus === 'failed' && editMode) {
    return <p>Article not found</p>
  }

  return (
    <form className="create-article__form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="create-article__title">{editMode ? 'Edit article' : 'Create new article'}</h2>
      <label className="create-article__label" htmlFor="Title">
        Title
        <input
          {...register('title', { required: 'Title can not be empty' })}
          className="create-article__input"
          type="text"
          id="Title"
          placeholder="Title"
        />
        <div>{errors.title && <p className="create-article__error">{errors?.title?.message || 'Error'}</p>}</div>
      </label>

      <label className="create-article__label" htmlFor="Description">
        Short description
        <input
          {...register('description', { required: 'Short description can not be empty' })}
          className="create-article__input"
          type="text"
          id="Description"
          placeholder="Short description"
        />
        <div>
          {errors.description && <p className="create-article__error">{errors?.description?.message || 'Error'}</p>}
        </div>
      </label>

      <label className="create-article__label" htmlFor="Body">
        Text
        <textarea
          {...register('body', { required: 'Body can not be empty' })}
          className="create-article__input create-article__input--width"
          type="text"
          id="Body"
          placeholder="Text"
        />
        <div>{errors.body && <p className="create-article__error">{errors?.body?.message || 'Error'}</p>}</div>
      </label>

      <label className="create-article__label" htmlFor="Tags">
        Tags
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="tag-field">
              <input
                {...register(`tagList.${index}`)}
                className="create-article__input create-article__input--tag"
                type="text"
                placeholder="Tag"
              />
              <button
                className="create-article__button create-article__button--delete"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            className="create-article__button create-article__button--add"
            type="button"
            onClick={() => append('')}
          >
            Add Tag
          </button>
        </div>
      </label>

      <button className="create-article__button create-article__button--submit" type="submit">
        Send
      </button>
    </form>
  )
}

export default CreateArticle

import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memo'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
interface Props {
  text: string
  setText: (text: string) => void
}
const { useState } = React


const Wrapper = styled.header`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  `

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1.3rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 48vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 48vw;
`

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          <ReactMarkdown children={text} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}
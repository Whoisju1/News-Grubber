import React, { createContext, useReducer } from 'react';
import styled from 'styled-components';
import Notification from '../../components/Notification';
import uuidv4 from 'uuid/v4';

type MsgId = string;

interface MessageInput {
  body: React.ReactNode;
  lifeSpan?: number;
  onEnd?: () => void;
  manualRemove?: () => void;
  type?: 'info' | 'danger' | 'confirmation'
}


interface Message extends MessageInput {
  id: string;
}

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: inline-grid;
  grid-auto-flow: row;
  z-index: 10000;
`;

interface ICtx {
  close: (id: string) => void;
  notify: (messageInput: MessageInput) => MsgId;
  clear: () => void;
}

export const NotificationCtx = createContext<ICtx>({
  clear: () => {},
  close: () => {},
  notify: () => void(0) as any as string,
});

interface Action {
  type: 'add' | 'remove' | 'clear'
  payload: Message;
}

const NotificationsProvider: React.FC = ({ children }) => {
  const [messages, dispatch] = useReducer((state: Message[], action: Action) => {
    const { type, payload } = action;
    if (type === 'add') {
      return [...state, payload];
    }
    if (type === 'remove') {
      return state.filter(({ id }) => id !== payload.id);
    }
    if (type === 'clear') {
      return [];
    }
    return state;
  }, [], () => []);

  const createMessage = (messageInput: MessageInput): Message => {
    const defaultOptions = {
      id: uuidv4(),
      lifeSpan: 4,
      manualRemove: () => {},
      onEnd: () => {},
    }

    return {
      ...defaultOptions,
      ...messageInput,
    };
  }

  const ctxValue: ICtx = {
    clear: () => dispatch({ type: 'clear', payload: { body: '', id: '' }}),
    close: (id) => dispatch({ type: 'remove', payload: { body: '', id } }),
    notify: (messageInput) => {
      const payload = createMessage(messageInput);
      dispatch({ type: 'add', payload });
      return payload.id;
    },
  };

  return (
    <NotificationCtx.Provider value={ctxValue}>
      {children}
      <NotificationWrapper>
        {messages.map(msg => (
          <Notification
            duration={msg.lifeSpan as number}
            key={msg.id}
            close={() => ctxValue.close(msg.id)}
            type={msg.type}
            onClose={msg.onEnd as () => void}
          >
            {msg.body}
          </Notification>
        ))}
      </NotificationWrapper>
    </NotificationCtx.Provider>
  );
};

export default NotificationsProvider;


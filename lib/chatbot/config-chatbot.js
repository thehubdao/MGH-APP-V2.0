import { createCustomMessage, } from 'react-chatbot-kit';

// Custom Messages
import Greeting from '../../components/Chatbot/Greeting';
import InputCurrency from '../../components/Chatbot/InputCurrency';
import LastMessage from '../../components/Chatbot/LastMessage';
import ObtainCurrency from '../../components/Chatbot/ObtainCurrency';
import OwnCurrencyQuestion from '../../components/Chatbot/OwnCurrencyQuestion';
import SelectCurrency from '../../components/Chatbot/SelectCurrency';
import WhiteSpace from '../../components/Chatbot/WhiteSpace';

const botName = 'MGH app purchase chatbot';

const config = {
  botName,
  initialMessages: [
    createCustomMessage('Mgh Greeting', 'greeting')
  ],
  customMessages: {
    greeting: (props) => <Greeting {...props} />,
    space: (props) => <WhiteSpace {...props} />
  },
  state: {
    currency: 'USDC',
    amount: 0
  },
  widgets: [
    {
      widgetName: 'select_currency',
      widgetFunc: (props) => <SelectCurrency {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'own_currency_question',
      widgetFunc: (props) => <OwnCurrencyQuestion {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'obtain_currency',
      widgetFunc: (props) => <ObtainCurrency {...props} />
    },
    {
      widgetName: 'input_currency',
      widgetFunc: (props) => <InputCurrency {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'go_back',
      widgetFunc: (props) => <LastMessage {...props} />
    }
  ],
};

export default config;
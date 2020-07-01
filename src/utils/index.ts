import { message } from 'antd';

export function showMessage(type: String, content: String) {
  switch (type) {
    case 'error': {
      message.error(content);
      break;
    }
    case 'warning': {
      message.warning(content);
      break;
    }
    case 'info': {
      message.info(content);
      break;
    }
    case 'success': {
      message.success(content);
      break;
    }
    default: 
      message.info(content);
  }
}

export function showOopsMessage() {
  message.error('Oops... something goes wrong.');
}
import React from 'react';
import { List, Button, Input } from 'antd';
import { CheckOutlined, DeleteOutlined, SendOutlined, EditOutlined, SaveOutlined, CloseSquareOutlined } from '@ant-design/icons';

import * as utils from './../utils';
import { queryTodoList, mutationAddTodo, mutationDeleteTodo, mutationChangeCompleted, mutationEditTodo } from './../action';


export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      editId: '',
      editContent: '',
      list: []
    };

    queryTodoList().then(res => {
      console.log(res.data.todoList)
      this.setState({
        ...this.state,
        list: res.data.todoList
      })
    }).catch(err => {
      utils.showOopsMessage();
      console.log(err);
    });

    this.onEditInput = this.onEditInput.bind(this);
  }

  setListState(data) {
    this.setState({
      ...this.state,
      list: data
    });
  }

  clearEditState() {
    this.setState({
      ...this.state,
      editId: '',
      editContent: ''
    });
  }

  onClickAdd(content) {
    if (!content) {
      utils.showMessage('error', "Noting to do? Maybe you don't need to add Todo item :)");
    } else {
      mutationAddTodo(content).then(res => {
        if (!res.data.addTodo.success) {
          utils.showMessage('error', "The Todo has not been added correctly, please try again.");
        } else {
          this.setListState(res.data.addTodo.todoList);
        }
      }).catch(err => {
        utils.showOopsMessage();
        console.log(err);
      });
    }
  }

  onClickChangeCompleted(id) {
    mutationChangeCompleted(id).then(res => {
      console.log(res)
      if (!res.data.changeCompleted.success) {
        utils.showMessage('error', "The Todo status has not been changed correctly, please try again.");
      } else {
        this.setListState(res.data.changeCompleted.todoList);
      }
    }).catch(err => {
      utils.showOopsMessage();
      console.log(err);
    });
  }

  onClickEdit(id, content) {
    this.setState({
      ...this.state,
      editId: id,
      editContent: content
    });
  }

  onEditInput({ target }) {
    const { value } = target;
    this.setState({
      ...this.state,
      editContent: value
    });
  }

  onSaveEdit(id) {
    let content = this.state.editContent;
    mutationEditTodo(id, content).then(res => {
      if (!res.data.editTodo.success) {
        utils.showMessage('error', "The Todo has not been edited correctly, please try again.");
      } else {
        this.setListState(res.data.editTodo.todoList);
        this.clearEditState();
      }
    }).catch(err => {
      utils.showOopsMessage();
      console.log(err);
    });
  }
  
  onClickDelete(id) {
    mutationDeleteTodo(id).then(res => {
      if (!res.data.deleteTodo.success) {
        utils.showMessage('error', "The Todo has not been deleted correctly, please try again.");
      } else {
        this.setListState(res.data.deleteTodo.todoList);
      }
    }).catch(err => {
      utils.showOopsMessage();
      console.log(err);
    });
  }

  render() {
    return (
      <List
        header={<Input.Search
          prefix={<SendOutlined />}
          placeholder=" New Todo item!"
          enterButton="Add"
          size="large"
          onSearch={value => this.onClickAdd(value)}
        />}
        bordered
        dataSource={this.state.list}
        renderItem={item =>
          <List.Item
            actions={this.state.editId !== item.id ? ([
              <Button type="text" icon={<EditOutlined />} onClick={() => this.onClickEdit(item.id, item.content)} />,
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => this.onClickDelete(item.id)} />
            ]) : ([
              <Button type="text" icon={<SaveOutlined />} onClick={() => this.onSaveEdit(item.id, item.content)} />,
              <Button type="text" danger icon={<CloseSquareOutlined />} onClick={() => this.clearEditState()} />]
            )}
          >
            <List.Item.Meta
              style={{ flex: "0 0" }}
              avatar={this.state.editId !== item.id ? (
                <Button type="text" size="large" style={item.completed ? ({ color: 'green' }) : ({ color: 'silver' })} icon={<CheckOutlined />} onClick={() => this.onClickChangeCompleted(item.id)} />
              ) : (
                <></>
              )}
            />
            {this.state.editId === item.id ? (
              <Input
                size="large"
                value={this.state.editContent}
                autoFocus
                onChange={this.onEditInput}
              />
            ) : (
              <span style={item.completed ? ({ textDecoration: 'line-through' }) : ({})}>{item.content}</span>
            )}
          </List.Item>
        }
      />
    );
  }
}
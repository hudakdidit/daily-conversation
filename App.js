import React from 'react';
import { StyleSheet, Text, View, TextInput, ListView, TouchableHighlight } from 'react-native';
import { spacing, colors, data } from './app/data';
import styles from './app/styles';
import Button from 'react-native-awesome-button';
import store from 'react-native-simple-store';
const storeName = 'daily-convo';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      currentAnswer: "8",
      answers: []
    };
    this.state.loading = true;
    // store.delete(storeName);
    store.get(storeName).then((savedStore) => {
      this.setState(Object.assign({}, state.state, JSON.parse(savedStore)));
    }).catch(e => {
      store.save(storeName, this.state);
    });
  }
  render() {
    const {
      currentQuestion,
      currentAnswer } = this.state;
    const sendAnswer = this.sendAnswer.bind(this);
    const nextQuestionText = data.questions[currentQuestion];
    const nextAnswerInput = !nextQuestionText ? undefined :
      <TextInput
        style={styles.answerInput}
        onChangeText={(currentAnswer) => this.setState({ currentAnswer })}
        value={currentAnswer} />;
    return (
      <View style={styles.container}>
        <Text style={styles.defaultText}>
          {nextQuestionText || data.summary.default }
        </Text>
        {nextAnswerInput || results({
          questions: data.questions,
          answers: this.state.answers
        }) }

        <Button
          states={{
            default: {
              text: "Send √",
              backgroundStyle: {
                backgroundColor: colors.$2,
                minHeight: 60,
                padding: 20
              },
              onPress: sendAnswer
            }
          }} />
      </View>
    );
  }

  sendAnswer() {
    const answers = this.state.answers.concat([this.state.currentAnswer]);
    this.setState({
      answers
    }, () => {
      this.nextQuestion();
    });

  }

  nextQuestion() {
    const { currentQuestion } = this.state;
    const nextQuestion = currentQuestion + 1;
    this.setState({ currentQuestion: nextQuestion });
  }
}

const results = ({
  answers,
  questions
}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  const dataSource = ds.cloneWithRows(data.questions.map((question, i) => {
    return {
      question,
      answer: answers[i]
    }
  }));
  return <ListView dataSource={dataSource}
          renderRow={({ question, answer}) => <Text>{question + " - " + answer}</Text>}
        />

}

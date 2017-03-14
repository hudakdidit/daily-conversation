import { StyleSheet } from 'react-native';
import { spacing, colors, data } from '../data';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.$1,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    paddingTop: spacing.lg,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm
  },
  defaultText: {
    fontSize: 35,
    marginBottom: 15
  },

  answerInput: {
    backgroundColor: 'white',
    borderColor: colors.$dark,
    borderWidth: 2,
    fontSize: 18,
    height: spacing.md,
    padding: spacing.sm,
    marginBottom: 20
  },

  button: {
    alignItems: 'stretch',
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
    backgroundColor: colors.$2
  }
});

export default styles;

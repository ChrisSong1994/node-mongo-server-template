import chalk from 'chalk';

function format(label: string, msg: string) {
    return msg
        .split('\n')
        .map((line, i) => (i === 0 ? `${label} ${line}` : line.padStart(chalk.reset(label).length)))
        .join('\n');
}

const info = (msg: string = '') => console.log(msg);
const done = (msg: string = '') => console.log(format(chalk.bgGreen.black(' DONE '), msg));
const warn = (msg: string = '') => console.warn(format(chalk.bgYellow.black(' WARN '), chalk.yellow(msg)));
const error = (msg: string = '') => console.error(format(chalk.bgRed(' ERROR '), chalk.red(msg)));

export default { info, done, warn, error };

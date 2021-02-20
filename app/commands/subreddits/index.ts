import { createPageCommand } from "../helpers";
import { importSubreddits } from "./import";
import { listSubreddits } from './list';
import { saveSubreddits } from './save';

const command = 'sub';
const save = 'save';
const list = 'list'
const importSaved = 'import';

export const subreddits = createPageCommand(command, (p, [ cmd ]: string[]) => {
  switch (cmd ?? '') {
    case save:
      return saveSubreddits(p);
    case list:
      return listSubreddits;
    case importSaved:
      return importSubreddits(p);
    default:
      return console.log(subredditHelp);
  }
});

export const subredditHelp = `
  ${command} - interact with your subreddits
    > ${list}: list all currently saved subreddits (default)
    > ${save}: navigate to your subreddits and save the urls
    > ${importSaved}: import all saved subreddits into your new account. You need to make sure you are logged into said new account.
    examples:
      ${command} ${list}
      ${command} ${save}
      ${command} ${importSaved}
`;

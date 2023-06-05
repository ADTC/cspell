import { mergeOptionalWithDefaults } from '../index.js';
import type { ITrieNodeRoot } from '../ITrieNode/ITrieNode.js';
import type { TrieOptions } from '../trie.js';
import type { TrieData } from '../TrieData.js';
import { findWordExact } from './find.js';
import { trieRootToITrieRoot } from './trie.js';
import { iteratorTrieWords } from './trie-util.js';
import type { TrieRoot } from './TrieNode.js';

export class TrieNodeTrie implements TrieData {
    private _iTrieRoot: ITrieNodeRoot | undefined;
    readonly options: TrieOptions;
    constructor(readonly root: TrieRoot) {
        this.options = mergeOptionalWithDefaults(root);
    }

    get iTrieRoot() {
        return this._iTrieRoot || (this._iTrieRoot = trieRootToITrieRoot(this.root));
    }

    getRoot(): ITrieNodeRoot {
        return this.iTrieRoot;
    }

    words(): Iterable<string> {
        return iteratorTrieWords(this.root);
    }

    has(word: string): boolean {
        return findWordExact(this.root, word);
    }

    isForbiddenWord(word: string): boolean {
        return findWordExact(this.root.c[this.root.forbiddenWordPrefix], word);
    }
}
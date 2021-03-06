export = langserver
export as namespace langserver

declare namespace langserver {
  /**
   * Position in a text document expressed as zero-based line and character offset.
   */
  interface Position {
    /**
     * Line position in a document (zero-based).
     */
    line: number
    /**
     * Character offset on a line in a document (zero-based). Assuming that the line is
     * represented as a string, the `character` value represents the gap between the
     * `character` and `character + 1`. Given the following line: 'a𐐀c', character 0 is
     * the gap between the start of the start and 'a' ('|a𐐀c'), character 1 is the gap
     * between 'a' and '𐐀' ('a|𐐀c') and character 2 is the gap between '𐐀' and 'b' ('a𐐀|c').
     *
     * The string 'a𐐀c' consist of 3 characters with valid character values being 0, 1, 2, 3
     * for that string. Note that the string encoded in UTF-16 is encoded using 4 code units
     * (the 𐐀 is encoded using two code units). The character offset is therefore encoding
     * independent.
     */
    character: number
  }
  /**
   * The Position namespace provides helper functions to work with
   * [Position](#Position) literals.
   */
  namespace Position {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line: number, character: number): Position
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value: any): value is Position
  }
  /**
   * A range in a text document expressed as (zero-based) start and end positions.
   */
  interface Range {
    /**
     * The range's start position
     */
    start: Position
    /**
     * The range's end position
     */
    end: Position
  }
  /**
   * The Range namespace provides helper functions to work with
   * [Range](#Range) literals.
   */
  namespace Range {
    /**
     * Create a new Range liternal.
     * @param start The range's start position.
     * @param end The range's end position.
     */
    function create(start: Position, end: Position): Range
    /**
     * Create a new Range liternal.
     * @param startLine The start line number.
     * @param startCharacter The start character.
     * @param endLine The end line number.
     * @param endCharacter The end character.
     */
    function create(
      startLine: number,
      startCharacter: number,
      endLine: number,
      endCharacter: number
    ): Range
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value: any): value is Range
  }
  /**
   * Represents a location inside a resource, such as a line
   * inside a text file.
   */
  interface Location {
    uri: string
    range: Range
  }
  /**
   * The Location namespace provides helper functions to work with
   * [Location](#Location) literals.
   */
  namespace Location {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri: string, range: Range): Location
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value: any): value is Location
  }
  /**
   * The diagnostic's serverity.
   */
  namespace DiagnosticSeverity {
    /**
     * Reports an error.
     */
    const Error: 1
    /**
     * Reports a warning.
     */
    const Warning: 2
    /**
     * Reports an information.
     */
    const Information: 3
    /**
     * Reports a hint.
     */
    const Hint: 4
  }
  type DiagnosticSeverity = 1 | 2 | 3 | 4
  /**
   * Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
   * are only valid in the scope of a resource.
   */
  interface Diagnostic {
    /**
     * The range at which the message applies
     */
    range: Range
    /**
     * The diagnostic's severity. Can be omitted. If omitted it is up to the
     * client to interpret diagnostics as error, warning, info or hint.
     */
    severity?: DiagnosticSeverity
    /**
     * The diagnostic's code. Can be omitted.
     */
    code?: number | string
    /**
     * A human-readable string describing the source of this
     * diagnostic, e.g. 'typescript' or 'super lint'.
     */
    source?: string
    /**
     * The diagnostic's message.
     */
    message: string
  }
  /**
   * The Diagnostic namespace provides helper functions to work with
   * [Diagnostic](#Diagnostic) literals.
   */
  namespace Diagnostic {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(
      range: Range,
      message: string,
      severity?: DiagnosticSeverity,
      code?: number | string,
      source?: string
    ): Diagnostic
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value: any): value is Diagnostic
  }
  /**
   * Represents a reference to a command. Provides a title which
   * will be used to represent a command in the UI and, optionally,
   * an array of arguments which will be passed to the command handler
   * function when invoked.
   */
  interface Command {
    /**
     * Title of the command, like `save`.
     */
    title: string
    /**
     * The identifier of the actual command handler.
     */
    command: string
    /**
     * Arguments that the command handler should be
     * invoked with.
     */
    arguments?: any[]
  }
  /**
   * The Command namespace provides helper functions to work with
   * [Command](#Command) literals.
   */
  namespace Command {
    /**
     * Creates a new Command literal.
     */
    function create(title: string, command: string, ...args: any[]): Command
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value: any): value is Command
  }
  /**
   * A text edit applicable to a text document.
   */
  interface TextEdit {
    /**
     * The range of the text document to be manipulated. To insert
     * text into a document create a range where start === end.
     */
    range: Range
    /**
     * The string to be inserted. For delete operations use an
     * empty string.
     */
    newText: string
  }
  /**
   * The TextEdit namespace provides helper function to create replace,
   * insert and delete edits more easily.
   */
  namespace TextEdit {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range: Range, newText: string): TextEdit
    /**
     * Creates a insert text edit.
     * @param psotion The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position: Position, newText: string): TextEdit
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range: Range): TextEdit
  }
  /**
   * Describes textual changes on a text document.
   */
  interface TextDocumentEdit {
    /**
     * The text document to change.
     */
    textDocument: VersionedTextDocumentIdentifier
    /**
     * The edits to be applied.
     */
    edits: TextEdit[]
  }
  /**
   * The TextDocumentEdit namespace provides helper function to create
   * create a edit that manipulates a text document.
   */
  namespace TextDocumentEdit {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(
      textDocument: VersionedTextDocumentIdentifier,
      edits: TextEdit[]
    ): TextDocumentEdit
    function is(value: any): value is TextDocumentEdit
  }
  /**
   * A workspace edit represents changes to many resources managed
   * in the workspace.
   */
  interface WorkspaceEdit {
    changes: TextDocumentEdit[]
  }
  /**
   * A change to capture text edits for existing resources.
   */
  interface TextEditChange {
    /**
     * Gets all text edits for this change.
     *
     * @return An array of text edits.
     */
    all(): TextEdit[]
    /**
     * Clears the edits for this change.
     */
    clear(): void
    /**
     * Adds a text edit.
     * @param edit the text edit to add.
     */
    add(edit: TextEdit): void
    /**
     * Insert the given text at the given position.
     *
     * @param position A position.
     * @param newText A string.
     */
    insert(position: Position, newText: string): void
    /**
     * Replace the given range with given text for the given resource.
     *
     * @param range A range.
     * @param newText A string.
     */
    replace(range: Range, newText: string): void
    /**
     * Delete the text at the given range.
     *
     * @param range A range.
     */
    delete(range: Range): void
  }
  /**
   * A workspace change helps constructing changes to a workspace.
   */
  class WorkspaceChange {
    private _workspaceEdit
    private _textEditChanges
    constructor(workspaceEdit?: WorkspaceEdit)
    /**
     * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
     * use to be returned from a workspace edit operation like rename.
     */
    readonly edit: WorkspaceEdit
    /**
     * Returns the [TextEditChange](#TextEditChange) to manage text edits
     * for resources.
     */
    getTextEditChange(
      textDocument: VersionedTextDocumentIdentifier
    ): TextEditChange
    getTextEditChange(uri: string): TextEditChange
  }
  /**
   * A literal to identify a text document in the client.
   */
  interface TextDocumentIdentifier {
    /**
     * The text document's uri.
     */
    uri: string
  }
  /**
   * The TextDocumentIdentifier namespace provides helper functions to work with
   * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
   */
  namespace TextDocumentIdentifier {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri: string): TextDocumentIdentifier
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value: any): value is TextDocumentIdentifier
  }
  /**
   * An identifier to denote a specific version of a text document.
   */
  interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
    /**
     * The version number of this document.
     */
    version: number
  }
  /**
   * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
   * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
   */
  namespace VersionedTextDocumentIdentifier {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(
      uri: string,
      version: number
    ): VersionedTextDocumentIdentifier
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value: any): value is VersionedTextDocumentIdentifier
  }
  /**
   * An item to transfer a text document from the client to the
   * server.
   */
  interface TextDocumentItem {
    /**
     * The text document's uri.
     */
    uri: string
    /**
     * The text document's language identifier
     */
    languageId: string
    /**
     * The version number of this document (it will strictly increase after each
     * change, including undo/redo).
     */
    version: number
    /**
     * The content of the opened text document.
     */
    text: string
  }
  /**
   * The TextDocumentItem namespace provides helper functions to work with
   * [TextDocumentItem](#TextDocumentItem) literals.
   */
  namespace TextDocumentItem {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param uri The document's language identifier.
     * @param uri The document's version number.
     * @param uri The document's text.
     */
    function create(
      uri: string,
      languageId: string,
      version: number,
      text: string
    ): TextDocumentItem
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value: any): value is TextDocumentItem
  }
  /**
   * The kind of a completion entry.
   */
  namespace CompletionItemKind {
    const Text: 1
    const Method: 2
    const Function: 3
    const Constructor: 4
    const Field: 5
    const Variable: 6
    const Class: 7
    const Interface: 8
    const Module: 9
    const Property: 10
    const Unit: 11
    const Value: 12
    const Enum: 13
    const Keyword: 14
    const Snippet: 15
    const Color: 16
    const File: 17
    const Reference: 18
  }
  type CompletionItemKind =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
  /**
   * Defines whether the insert text in a completion item should be interpreted as
   * plain text or a snippet.
   */
  namespace InsertTextFormat {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    const PlainText: 1
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    const Snippet: 2
  }
  type InsertTextFormat = 1 | 2
  /**
   * A completion item represents a text snippet that is
   * proposed to complete text that is being typed.
   */
  interface CompletionItem {
    /**
     * The label of this completion item. By default
     * also the text that is inserted when selecting
     * this completion.
     */
    label: string
    /**
     * The kind of this completion item. Based of the kind
     * an icon is chosen by the editor.
     */
    kind?: CompletionItemKind
    /**
     * A human-readable string with additional information
     * about this item, like type or symbol information.
     */
    detail?: string
    /**
     * A human-readable string that represents a doc-comment.
     */
    documentation?: string
    /**
     * A string that shoud be used when comparing this item
     * with other items. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    sortText?: string
    /**
     * A string that should be used when filtering a set of
     * completion items. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    filterText?: string
    /**
     * A string that should be inserted a document when selecting
     * this completion. When `falsy` the [label](#CompletionItem.label)
     * is used.
     */
    insertText?: string
    /**
     * The format of the insert text. The format applies to both the `insertText` property
     * and the `newText` property of a provided `textEdit`.
     */
    insertTextFormat?: InsertTextFormat
    /**
     * An [edit](#TextEdit) which is applied to a document when selecting
     * this completion. When an edit is provided the value of
     * [insertText](#CompletionItem.insertText) and [range](#CompletionItem.range) is ignored.
     */
    textEdit?: TextEdit
    /**
     * An optional array of additional [text edits](#TextEdit) that are applied when
     * selecting this completion. Edits must not overlap with the main [edit](#CompletionItem.textEdit)
     * nor with themselves.
     */
    additionalTextEdits?: TextEdit[]
    /**
     * An optional [command](#Command) that is executed *after* inserting this completion. *Note* that
     * additional modifications to the current document should be described with the
     * [additionalTextEdits](#CompletionItem.additionalTextEdits)-property.
     */
    command?: Command
    /**
     * An data entry field that is preserved on a completion item between
     * a [CompletionRequest](#CompletionRequest) and a [CompletionResolveRequest]
     * (#CompletionResolveRequest)
     */
    data?: any
  }
  /**
   * The CompletionItem namespace provides functions to deal with
   * completion items.
   */
  namespace CompletionItem {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label: string): CompletionItem
  }
  /**
   * Represents a collection of [completion items](#CompletionItem) to be presented
   * in the editor.
   */
  interface CompletionList {
    /**
     * This list it not complete. Further typing results in recomputing this list.
     */
    isIncomplete: boolean
    /**
     * The completion items.
     */
    items: CompletionItem[]
  }
  /**
   * The CompletionList namespace provides functions to deal with
   * completion lists.
   */
  namespace CompletionList {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(
      items?: CompletionItem[],
      isIncomplete?: boolean
    ): CompletionList
  }
  /**
   * MarkedString can be used to render human readable text. It is either a markdown string
   * or a code-block that provides a language and a code snippet. The language identifier
   * is sematically equal to the optional language identifier in fenced code blocks in GitHub
   * issues. See https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting
   *
   * The pair of a language and a value is an equivalent to markdown:
   * ```${language}
   * ${value}
   * ```
   *
   * Note that markdown strings will be sanitized - that means html will be escaped.
   */
  type MarkedString =
    | string
    | {
        language: string
        value: string
      }
  namespace MarkedString {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText: string): MarkedString
  }
  /**
   * The result of a hover request.
   */
  interface Hover {
    /**
     * The hover's content
     */
    contents: MarkedString | MarkedString[]
    /**
     * An optional range
     */
    range?: Range
  }
  /**
   * Represents a parameter of a callable-signature. A parameter can
   * have a label and a doc-comment.
   */
  interface ParameterInformation {
    /**
     * The label of this signature. Will be shown in
     * the UI.
     */
    label: string
    /**
     * The human-readable doc-comment of this signature. Will be shown
     * in the UI but can be omitted.
     */
    documentation?: string
  }
  /**
   * The ParameterInformation namespace provides helper functions to work with
   * [ParameterInformation](#ParameterInformation) literals.
   */
  namespace ParameterInformation {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label: string, documentation?: string): ParameterInformation
  }
  /**
   * Represents the signature of something callable. A signature
   * can have a label, like a function-name, a doc-comment, and
   * a set of parameters.
   */
  interface SignatureInformation {
    /**
     * The label of this signature. Will be shown in
     * the UI.
     */
    label: string
    /**
     * The human-readable doc-comment of this signature. Will be shown
     * in the UI but can be omitted.
     */
    documentation?: string
    /**
     * The parameters of this signature.
     */
    parameters?: ParameterInformation[]
  }
  /**
   * The SignatureInformation namespace provides helper functions to work with
   * [SignatureInformation](#SignatureInformation) literals.
   */
  namespace SignatureInformation {
    function create(
      label: string,
      documentation?: string,
      ...parameters: ParameterInformation[]
    ): SignatureInformation
  }
  /**
   * Signature help represents the signature of something
   * callable. There can be multiple signature but only one
   * active and only one active parameter.
   */
  interface SignatureHelp {
    /**
     * One or more signatures.
     */
    signatures: SignatureInformation[]
    /**
     * The active signature.
     */
    activeSignature: number
    /**
     * The active parameter of the active signature.
     */
    activeParameter: number
  }
  /**
   * The definition of a symbol represented as one or many [locations](#Location).
   * For most programming languages there is only one location at which a symbol is
   * defined.
   */
  type Definition = Location | Location[]
  /**
   * Value-object that contains additional information when
   * requesting references.
   */
  interface ReferenceContext {
    /**
     * Include the declaration of the current symbol.
     */
    includeDeclaration: boolean
  }
  /**
   * A document highlight kind.
   */
  namespace DocumentHighlightKind {
    /**
     * A textual occurrance.
     */
    const Text: 1
    /**
     * Read-access of a symbol, like reading a variable.
     */
    const Read: 2
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    const Write: 3
  }
  type DocumentHighlightKind = 1 | 2 | 3
  /**
   * A document highlight is a range inside a text document which deserves
   * special attention. Usually a document highlight is visualized by changing
   * the background color of its range.
   */
  interface DocumentHighlight {
    /**
     * The range this highlight applies to.
     */
    range: Range
    /**
     * The highlight kind, default is [text](#DocumentHighlightKind.Text).
     */
    kind?: DocumentHighlightKind
  }
  /**
   * DocumentHighlight namespace to provide helper functions to work with
   * [DocumentHighlight](#DocumentHighlight) literals.
   */
  namespace DocumentHighlight {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(
      range: Range,
      kind?: DocumentHighlightKind
    ): DocumentHighlight
  }
  /**
   * A symbol kind.
   */
  namespace SymbolKind {
    const File: 1
    const Module: 2
    const Namespace: 3
    const Package: 4
    const Class: 5
    const Method: 6
    const Property: 7
    const Field: 8
    const Constructor: 9
    const Enum: 10
    const Interface: 11
    const Function: 12
    const Variable: 13
    const Constant: 14
    const String: 15
    const Number: 16
    const Boolean: 17
    const Array: 18
  }
  type SymbolKind =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
  /**
   * Represents information about programming constructs like variables, classes,
   * interfaces etc.
   */
  interface SymbolInformation {
    /**
     * The name of this symbol.
     */
    name: string
    /**
     * The kind of this symbol.
     */
    kind: SymbolKind
    /**
     * The location of this symbol.
     */
    location: Location
    /**
     * The name of the symbol containing this symbol.
     */
    containerName?: string
  }
  namespace SymbolInformation {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containg the symbol.
     */
    function create(
      name: string,
      kind: SymbolKind,
      range: Range,
      uri?: string,
      containerName?: string
    ): SymbolInformation
  }
  /**
   * Parameters for a [DocumentSymbolRequest](#DocumentSymbolRequest).
   */
  interface DocumentSymbolParams {
    /**
     * The text document.
     */
    textDocument: TextDocumentIdentifier
  }
  /**
   * The parameters of a [WorkspaceSymbolRequest](#WorkspaceSymbolRequest).
   */
  interface WorkspaceSymbolParams {
    /**
     * A non-empty query string
     */
    query: string
  }
  /**
   * Contains additional diagnostic information about the context in which
   * a [code action](#CodeActionProvider.provideCodeActions) is run.
   */
  interface CodeActionContext {
    /**
     * An array of diagnostics.
     */
    diagnostics: Diagnostic[]
  }
  /**
   * The CodeActionContext namespace provides helper functions to work with
   * [CodeActionContext](#CodeActionContext) literals.
   */
  namespace CodeActionContext {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics: Diagnostic[]): CodeActionContext
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value: any): value is CodeActionContext
  }
  /**
   * A code lens represents a [command](#Command) that should be shown along with
   * source text, like the number of references, a way to run tests, etc.
   *
   * A code lens is _unresolved_ when no command is associated to it. For performance
   * reasons the creation of a code lens and resolving should be done to two stages.
   */
  interface CodeLens {
    /**
     * The range in which this code lens is valid. Should only span a single line.
     */
    range: Range
    /**
     * The command this code lens represents.
     */
    command?: Command
    /**
     * An data entry field that is preserved on a code lens item between
     * a [CodeLensRequest](#CodeLensRequest) and a [CodeLensResolveRequest]
     * (#CodeLensResolveRequest)
     */
    data?: any
  }
  /**
   * The CodeLens namespace provides helper functions to work with
   * [CodeLens](#CodeLens) literals.
   */
  namespace CodeLens {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range: Range, data?: any): CodeLens
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value: any): value is CodeLens
  }
  /**
   * Value-object describing what options formatting should use.
   */
  interface FormattingOptions {
    /**
     * Size of a tab in spaces.
     */
    tabSize: number
    /**
     * Prefer spaces over tabs.
     */
    insertSpaces: boolean
    /**
     * Signature for further properties.
     */
    [key: string]: boolean | number | string
  }
  /**
   * The FormattingOptions namespace provides helper functions to work with
   * [FormattingOptions](#FormattingOptions) literals.
   */
  namespace FormattingOptions {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize: number, insertSpaces: boolean): FormattingOptions
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value: any): value is FormattingOptions
  }
  /**
   * A document link is a range in a text document that links to an internal or external resource, like another
   * text document or a web site.
   */
  class DocumentLink {
    /**
     * The range this link applies to.
     */
    range: Range
    /**
     * The uri this link points to.
     */
    target?: string
  }
  /**
   * The DocumentLink namespace provides helper functions to work with
   * [DocumentLink](#DocumentLink) literals.
   */
  namespace DocumentLink {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range: Range, target?: string): DocumentLink
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value: any): value is DocumentLink
  }
  const EOL: string[]
  /**
   * A simple text document. Not to be implemenented.
   */
  interface TextDocument {
    /**
     * The associated URI for this document. Most documents have the __file__-scheme, indicating that they
     * represent files on disk. However, some documents may have other schemes indicating that they are not
     * available on disk.
     *
     * @readonly
     */
    readonly uri: string
    /**
     * The identifier of the language associated with this document.
     *
     * @readonly
     */
    readonly languageId: string
    /**
     * The version number of this document (it will strictly increase after each
     * change, including undo/redo).
     *
     * @readonly
     */
    readonly version: number
    /**
     * Get the text of this document.
     *
     * @return The text of this document.
     */
    getText(): string
    /**
     * Converts a zero-based offset to a position.
     *
     * @param offset A zero-based offset.
     * @return A valid [position](#Position).
     */
    positionAt(offset: number): Position
    /**
     * Converts the position to a zero-based offset.
     *
     * The position will be [adjusted](#TextDocument.validatePosition).
     *
     * @param position A position.
     * @return A valid zero-based offset.
     */
    offsetAt(position: Position): number
    /**
     * The number of lines in this document.
     *
     * @readonly
     */
    readonly lineCount: number
  }
  namespace TextDocument {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(
      uri: string,
      languageId: string,
      version: number,
      content: string
    ): TextDocument
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value: any): value is TextDocument
  }
  /**
   * Event to signal changes to a simple text document.
   */
  interface TextDocumentChangeEvent {
    /**
     * The document that has changed.
     */
    document: TextDocument
  }
  /**
   * Represents reasons why a text document is saved.
   */
  namespace TextDocumentSaveReason {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    const Manual: 1
    /**
     * Automatic after a delay.
     */
    const AfterDelay: 2
    /**
     * When the editor lost focus.
     */
    const FocusOut: 3
  }
  type TextDocumentSaveReason = 1 | 2 | 3
  interface TextDocumentWillSaveEvent {
    /**
     * The document that will be saved
     */
    document: TextDocument
    /**
     * The reason why save was triggered.
     */
    reason: TextDocumentSaveReason
  }
  /**
   * An event describing a change to a text document. If range and rangeLength are omitted
   * the new text is considered to be the full content of the document.
   */
  interface TextDocumentContentChangeEvent {
    /**
     * The range of the document that changed.
     */
    range?: Range
    /**
     * The length of the range that got replaced.
     */
    rangeLength?: number
    /**
     * The new text of the document.
     */
    text: string
  }
}

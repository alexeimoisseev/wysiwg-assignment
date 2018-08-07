## First steps

The most challenging part here is to figure out how to mark ranges in formatted text.
This marking is implemented in any WYSIWYG editor. Let's take a look how they do it there.

Found https://draftjs.org library. Maybe it is possible to build a solution on it.
Maybe this problem (adding comments to text) was already solved with draft-js by some guys.

Well, [there](https://github.com/maxxafari/draftjs-comment-text) is this implementation of similar functionality, but it still contains many bugs and no persistense there. But at least this shows that it is possible to do with draft-js.

Let's pick this draft-js!

## Data structuring

We need to store comment text and other information (author, date, ...) and also the position of selected text. Storing them in a single place could be tricky. We the need to take care of modifying text in editor which we would not like to do. There is draft-js for this.

It is acceptable to store modified rich text with marks of comments. In those marks (entities in therms of draft-js) we store ID of comment object.

## Interaction between comments list and highlited parts of text

Entity (highlited part of text with comment) can be a regular React component. Task says that clicking on comment should move us back to the commented text.

Let's make an interaction between comments in the list and hightlighted text via Redux! We connect each `Entity` component to rerux store. When clicking on comment in the list we set selected comment. This is checked in Entity component and set to the proper class that hightlights that part of text stronger.

This approach also helps us to solve the problem when the comment is put on the different parts of text.

E.g. last part of H1 and first part of the following P tags are selected together and commented. Those highlighted entities are actually separate `<span>` tags. But since the know the ID of their comment and know the ID of selected component, they both can be hightlighted.

### Atomic save

The solution desribed above makes us to take care of synchronisation between text contents and comments. Adding comment becomes a non-atomic operation. When we save comment, we must be sure that rich text is also saved properly. So we need to introduce some kind of transactions: saving comment, then saving editor state, and if second is failed, removing comment. This part is not implemented in provided solution.

## Other existing problems

1. Every time we select text, popup with input for comment is shonw. So you cannot select text and remove it. Can be fixed by adding some close button for the form.
1. When text with the comment is removed, the comment remains there but clicking on it does nothing. Not sure if it is a problem.
1. Still poor styles.
1. All paths to components are relative. I decided not to `eject` from create-react-app in order to keep solution clear and clean. But I usually prefer to add some aliases to webpack config so that components could be reached by `import Component from 'components/Component'`.
1. No tests provided

## Files to take a look

* `RichContent` - main component with rich content.
* `InlineComment` - component that highlights inside rich content.
* `CommentForm` - form for adding comments
* `actions`, `reducers` - well... their names describe themselves.
*

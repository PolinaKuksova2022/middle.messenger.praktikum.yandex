export function emptyMessage () {
    const message = document.getElementsByName('message')[0];

    // const target = event.target as HTMLTextAreaElement;
    const value = (message as HTMLTextAreaElement).value;
    const error = document.createElement('div');
    error.className = 'error-message';
    if(value.length == 0) {
        error.innerHTML = 'Поле не может быть пустым';
        message.after(error);
        message.classList.add('input-incorrect');
    }
    console.log(value);
}
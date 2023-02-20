const Header = () => {
    return ( 
        <div className="header">
            <h1>Hangman</h1>

    {/* There are 60854 words in the list once the hyphens and capitals have been removed. */}

            <p>Guess the word from our list of over 60,000 possibilities:</p>

        </div>

     );
}
 
export default Header;
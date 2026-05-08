const textInput = document.getElementById('textInput');
        const outputText = document.getElementById('outputText');
        const charCount = document.getElementById('charCount');
        const startRewritingBtn = document.getElementById('startRewritingBtn');
        const statusIndicator = document.getElementById('statusIndicator');
        
        // Track typing state
        let isTypingEnabled = true;
        
        // Add event listener for real-time input
        textInput.addEventListener('input', function() {
            if (!isTypingEnabled) return; // Don't update if typing is disabled
            
            const inputValue = this.value;
            
            // Update the paragraph with the input value
            if (inputValue.trim() === '') {
                outputText.textContent = 'Your text will appear here as you type...';
                outputText.className = 'placeholder';
            } else {
                outputText.textContent = inputValue;
                outputText.className = '';
            }
            
            // Update character count
            charCount.textContent = inputValue.length;
        });
        
        // Add event listener for Enter key
        textInput.addEventListener('keydown', function(event) {
            console.log(event.key);
            if (event.key === 'Enter') {
                stopTyping();
            } else if (isTypingEnabled) {
                // Optional: Add some visual feedback when typing
                outputText.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    outputText.style.transform = 'scale(1)';
                }, 100);
            }
        });
        
        // Function to stop typing
        function stopTyping() {
            isTypingEnabled = false;
            textInput.disabled = true;
            textInput.style.opacity = '0.6';
            startRewritingBtn.style.display = 'inline-block';
            statusIndicator.textContent = '⏸️ Typing Stopped';
            statusIndicator.className = 'status-indicator status-stopped';
        }
        
        // Function to start rewriting
        function startRewriting() {
            isTypingEnabled = true;
            textInput.disabled = false;
            textInput.style.opacity = '1';
            textInput.value = ''; // Clear the input
            outputText.textContent = 'Your text will appear here as you type...';
            outputText.className = 'placeholder';
            charCount.textContent = '0';
            startRewritingBtn.style.display = 'none';
            statusIndicator.textContent = '✏️ Typing Active';
            statusIndicator.className = 'status-indicator status-active';
            textInput.focus(); // Focus on input for immediate typing
        }
        
        // Add event listener for start rewriting button
        startRewritingBtn.addEventListener('click', startRewriting);
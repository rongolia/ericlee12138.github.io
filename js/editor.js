$.when($.ready).then(() => {
    let editor, output;
    let editorEle = '#editor', outputEle = '#output';
    let running = false;
    let runButton = '#run';
    let copyButton = '#copy';
    // let themeButton = '#theme';
    let status = '#status';

    let timeout;

    const Range = ace.require('ace/range').Range;

    editor = ace.edit('editor');
    editor.setTheme('ace/theme/cloud9_night_low_color');
    editor.session.setMode('ace/mode/c_cpp');
    editor.session.setValue(localStorage.getItem('code'));
    editor.session.setUseWrapMode(true);
    editor.session.on('change', () => {
        localStorage.setItem('code', editor.getSession().getValue());
    });

    window.addEventListener('keydown', (e) => {
        if (document.activeElement.closest(editorEle))
        {
            if ((e.ctrlKey || e.metaKey) && e.key === 's')
            {
                e.preventDefault();
            }
        }
    });

    output = ace.edit('output');
    output.setTheme('ace/theme/cloud9_night_low_color');
    output.setReadOnly(true);
    output.setShowPrintMargin(false);
    output.setHighlightActiveLine(false);
    output.session.setMode('ace/mode/text');
    output.session.setValue('');
    output.renderer.setShowGutter(false);
    output.renderer.$cursorLayer.element.style.display = 'none';
    output.setOptions({
        highlightGutterLine: false,
        showLineNumbers: false,
        showFoldWidgets: false
    });

    $(runButton).on('click', (event) => {
        if (running) return;

        $(outputEle).height(100);
        running = true;
        showStatus('running');
        $.ajax({
            url: 'https://nas.rongolia.com:8443/run',
            // url: 'https://192.168.1.173:8443/run',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                language: 'cpp',
                code: editor.getSession().getValue()
            }),
            success: (response) => {
                console.log(response);
                setTimeout(() => {
                    running = false;
                    showStatus('success');
                    showOutput(response.output);
                }, 1000);
                
            },
            error: () => {
                setTimeout(() => {
                    showStatus('fail');
                    showError('Server is currently offline.');
                }, 1000);
                
            }
        });
    });

    $(copyButton).on('click', (event) => {
        clearTimeout(timeout);

        navigator.clipboard.writeText(editor.getSession().getValue());

        $(copyButton).removeClass('grey');
        $(copyButton).addClass('green');
        $(copyButton + ' > h3').text('Copied!');

        timeout = setTimeout(() => {
            $(copyButton).removeClass('green');
            $(copyButton).addClass('grey');
        $(copyButton + ' > h3').text('Copy');
    }, 2000);
    });

    let showStatus = (code) => {
        $(status).removeClass();
        let runningText = '';
        let annotation = 'info';
        switch (code) {
            case 'success':
                $(status).addClass('green');
                runningText = '>>> Success\n';
                break;
            case 'fail':
                $(status).addClass('red');
                runningText = '>>> Fail\n';
                break;
            case 'running':
                runningText = '>>> Running script\n';
                break;
        }
        append(runningText, code);

    }
    let showOutput = (response) => {
        append(response);
        output.scrollToLine(editor.session.getLength(), false);
    }
    let showError = (response) => {
        console.log(response);
        // $(output).append('<p><span style="color:var(--color-red);">Error</span><br>' + response + '</p>');
        // $(output).scrollTop($(output).prop('scrollHeight'));
    }
    let append = (text, code) => {
        let lastRow = output.session.getLength() - 1;
        let lastLine = output.session.getLine(lastRow);
        let insertRow = lastLine === '' ? lastRow : lastRow + 1;
        output.session.insert({ row: insertRow, coloumn: 0}, text);
        if(code !== undefined) {
            console.log(insertRow, `custom-highlight-${code}`);
            // output.session.addMarker(
            //     new Range(insertRow, 0, insertRow + 1, 0),
            //     `custom-highlight-${code}`,
            //     'fullLine'
            // );
        }
    };
});
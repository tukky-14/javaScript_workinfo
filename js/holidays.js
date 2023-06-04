// https://holidays-jp.github.io/

const holidays = [];

const getHolidays = async () => {
    const response = await fetch('https://holidays-jp.github.io/api/v1/date.json');
    const data = await response.json();

    for (const date in data) {
        const name = data[date];
        holidays.push({ date: date.replaceAll('-', '/'), name });
    }
    return data;
};

const setHolidays = async () => {
    await getHolidays();

    // 表示する祝日の要素を取得します
    const holidayElement = document.getElementById('holiday');

    // 表のヘッダーを作成します
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const dateHeader = document.createElement('th');
    const nameHeader = document.createElement('th');

    dateHeader.textContent = '日付';
    nameHeader.textContent = '祝日';
    headerRow.appendChild(dateHeader);
    headerRow.appendChild(nameHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 表のボディーを作成します
    const tbody = document.createElement('tbody');

    // 祝日のデータをループして行を作成します
    for (const holiday of holidays) {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const nameCell = document.createElement('td');

        dateCell.textContent = holiday.date;
        nameCell.textContent = holiday.name;
        row.appendChild(dateCell);
        row.appendChild(nameCell);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    // テーブルをページに追加します
    holidayElement.appendChild(table);
};

setHolidays();

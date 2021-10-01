const bubbleSort = async (state, elements, callback) => {
    for (let i = 1; i < elements.length; ++i) {
        if (state.sorting == false) return;
        for (let j = 0; j < elements.length-1; ++j) {
            if (elements[j] > elements[j+1]) {
                let tmp = elements[j];
                elements[j] = elements[j+1];
                elements[j+1] = tmp;
            }
            await callback(elements);
        }
        await sleep(1);
    }
    state.sorting = false;
}



const insertionSort = async (state, elements, callback) => {
    for (let i = 1; i < elements.length; ++i) {
        let j = i;
        if (state.sorting == false) return;
        while (j > 0 && elements[j-1] > elements[j]) {
            let tmp = elements[j];
            elements[j] = elements[j-1];
            elements[j-1] = tmp;
            j--;
            await callback(elements);
        }
        await sleep(1);
    }
    state.sorting = false;
}



const selectionSort = async (state, elements, callback) => {
    for (let i = 0; i < elements.length-1; ++i) {
        if (state.sorting == false) return;
        let min = i;
        for (let j = i+1; j < elements.length; ++j) {
            if (elements[j] < elements[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = elements[i];
            elements[i] = elements[min];
            elements[min] = tmp;
            await callback(elements);
        }
        await sleep(1);
    }
    state.sorting = false;
}
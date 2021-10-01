const bubbleSort = async (state, elements, callback) => {
    for (let i = 1; i < elements.length; ++i) {
        for (let j = 0; j < elements.length-1; ++j) {
            if (state.sorting == false) return;
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
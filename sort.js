const bubbleSort = async (state, elements, callback) => {
    for (let i = 1; i < elements.length; ++i) {
        if (state.sorting == false) return;
        for (let j = 0; j < elements.length-1; ++j) {
            if (elements[j] > elements[j+1]) {
                let tmp = elements[j];
                elements[j] = elements[j+1];
                elements[j+1] = tmp;
                await callback(elements);
            }
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



const mergeSort = async (state, elements, callback) => {
    const merge = async (callback, array, a, b) => {
        let aCopy = {...a};
        let index = aCopy.start;
        let oldArray = [...array];

        while (a.end-a.start > 0 && b.end-b.start > 0) {
            if (oldArray[a.start] > oldArray[b.start]) {
                array[index] = oldArray[b.start];
                ++b.start;
                ++index;
                await callback(array);
                await sleep(1);
            }
            else {
                array[index] = oldArray[a.start];
                ++a.start;
                ++index;
                await callback(array);
                await sleep(1);
            }
        }

        while (a.end-a.start > 0) {
            array[index] = oldArray[a.start];
            ++a.start;
            ++index;
            await callback(array);
            await sleep(1);
        }
        while (b.end-b.start > 0) {
            array[index] = oldArray[b.start];
            ++b.start;
            ++index;
            await callback(array);
            await sleep(1);
        }

        return array;
    }

    const sort = async (state, callback, array, start, end) => {
        if (end-start == 1) return {start, end};

        let arrayOne = await sort(state, callback, array, start, start + Math.floor((end-start)/2));
        let arrayTwo = await sort(state, callback, array, start + Math.floor((end-start)/2), end);

        if (state.sorting == false) return;
        array = await merge(callback, array, arrayOne, arrayTwo);

        return {start, end};
    }

    await sort(state, callback, elements, 0, elements.length);
}
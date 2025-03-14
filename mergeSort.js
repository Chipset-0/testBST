function mergeSort(arr) {
    return mergeSortRecurse(arr, 0, arr.length-1)
}

function mergeSortRecurse(arr, indexLeft, indexRight)
{
    //If only one element
    if (indexLeft == indexRight)
    {
        return
    }
    //If only two elements
    else if (indexLeft >= indexRight - 1)
    {
        if (arr[indexLeft] > arr[indexRight])
        {
            let temp = arr[indexRight]
            arr[indexRight] = arr[indexLeft]
            arr[indexLeft] = temp
        }
        return
    }
    let indexMiddle = Math.floor((indexRight-indexLeft)/2)+indexLeft
    //Sort left side
    mergeSortRecurse(arr, indexLeft, indexMiddle)
    //Sort right side
    mergeSortRecurse(arr, indexMiddle+1, indexRight)

    //Sort both sides
    let temp = []
    temp.length = indexRight-indexLeft+1

    let i = 0;
    let l = indexLeft
    let r = indexMiddle+1
    while ( i < temp.length && l <= indexMiddle && r <= indexRight)
    {
        if (arr[l] <= arr[r])
        {
            temp[i] = arr[l]
            l += 1;
        }
        else
        {
            temp[i] = arr[r]
            r += 1;
        }
        i += 1
    }
    while (l <= indexMiddle)
    {
        temp[i] = arr[l]
        l += 1
        i +=1
    }
    while (r <= indexRight)
    {
        temp[i] = arr[r]
        r += 1
        i+=1
    }
    let j = 0
    for (let i = indexLeft; i <= indexRight; i++)
    {
        arr[i] = temp[j]
        j += 1
    }

    return arr
}

export {mergeSort}
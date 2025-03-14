const { mergeSort } = require('./mergeSort')

require('./mergeSort')

class BinaryTreeNode
{

    constructor(data, left=null, right=null)
    {
        this.left = left
        this.data = data
        this.right = right
    }

    getLeft()
    {
        return this.left
    }

    getData()
    {
        return this.data
    }

    getRight()
    {
        return this.right
    }

    setLeft(left)
    {
        this.left = left
    }

    setData()
    {
        return this.data
    }

    setRight(right)
    {
        this.right = right
    }

    hasLeft()
    {
        return this.left != null
    }

    hasRight()
    {
        return this.right != null
    }
}

class BinarySortTree 
{
    head = null
    size = 0
    constructor(arr, sorted=false)
    {
        if (!sorted)
        {
            mergeSort(arr)
        }
        this.head = this.#constructBST(arr)
        this.size = arr.length
    }

    #constructBST(arr)
    {
        let middle = Math.floor(arr.length/2)
        return this.#constructBSTRecurse(arr, 0, arr.length-1, true)
    }

    #constructBSTRecurse(arr, leftIndex, rightIndex, leftSide=true)
    {
        //If one element
        if (leftIndex == rightIndex)
        {
            return new BinaryTreeNode(arr[leftIndex])
        }
        //If two elements
        else if (leftIndex == rightIndex - 1)
        {
            let smaller = null
            let larger = null
            if (arr[leftIndex] <= arr[rightIndex])
            {
                smaller = new BinaryTreeNode(arr[leftIndex])
                larger =  new BinaryTreeNode(arr[rightIndex])
            }
            else {
                larger = new BinaryTreeNode(arr[leftIndex])
                smaller =  new BinaryTreeNode(arr[rightIndex])
            }
            if (leftSide)
            {
                larger.setLeft(smaller)
                return larger
            }
            else
            {
                smaller.setRight(larger)
                return smaller
            }
        }
        //If three elements
        else if (leftIndex == rightIndex-2)
        {
            let left = new BinaryTreeNode(arr[leftIndex])
            let right  = new BinaryTreeNode(arr[rightIndex])
            return new BinaryTreeNode(arr[rightIndex-1], left, right)
        }
        let middleIndex = Math.floor((rightIndex-leftIndex)/2+leftIndex)
        let center = new BinaryTreeNode(arr[middleIndex])
        center.setLeft(this.#constructBSTRecurse(arr, leftIndex, middleIndex-1,true))
        center.setRight(this.#constructBSTRecurse(arr, middleIndex+1, rightIndex, false))
        return center
    }

    has(value)
    {
        if (this.head == null)
        {
            return false
        }
        return this.#hasRecurse(value, this.head)
    }

    #hasRecurse(value, currNode)
    {
        if (value == currNode.data)
        {
            return true
        }
        if (currNode.getLeft() != null && this.#hasRecurse(value, currNode.getLeft()))
        {
            return true
        }
        if (currNode.getRight() != null && this.#hasRecurse(value, currNode.getRight()))
        {
            return true
        }
        return false
    }

    insertItem(value)
    {
        let closestNode = this.#findRecurse(value, this.head)
        //Dont insert if the same value is found, insert left or right depending on < or >
        if (closestNode.data != value)
        {
            let newNode = new BinaryTreeNode(value)
            if (value < closestNode.data)
            {
                closestNode.setLeft(newNode)
            }
            else
            {
                closestNode.setRight(newNode)
            }
            this.size += 1
        }
    }

    findItem(value)
    {
        let closestNode = this.#findRecurse(value, this.head)
        if (closestNode.data == value)
        {
            return closestNode
        }
        return null
    }

    #findRecurse(value, currNode)
    {
        if (value == currNode.data)
        {
            return currNode
        }
        else if (currNode.data > value && currNode.hasLeft())
        {
            return this.#findRecurse(value, currNode.getLeft())
        }
        else if (currNode.data < value && currNode.hasRight())
        {
            return this.#findRecurse(value, currNode.getRight())
        }
        return currNode;
    }

    deleteItem(value)
    {
        return this.#deleteRecurse(value, this.head, null)
    }

    #deleteRecurse(value, currNode, parentNode)
    {
        //If match, delete
        if (currNode.data == value)
        {
            return this.#deleteNode(currNode, parentNode)
        }
        //Go left
        else if (currNode.data > value && currNode.hasLeft())
        {
            return this.#deleteRecurse(value, currNode.getLeft(), currNode)
        }
        else if (currNode.data < value && currNode.hasRight())
        {
            return this.#deleteRecurse(value, currNode.getRight(), currNode)
        }
        else
        {
            return false
        }

    }

    #deleteNode(nodeToDelete, parentNode=null)
    {
        //No Children
        if (!nodeToDelete.hasLeft() && !nodeToDelete.hasRight())
        {
            if (parentNode != null)
            {
                if (parentNode.value > nodeToDelete.value)
                {
                    parentNode.setLeft(null)
                }
                else
                {
                    parentNode.setRight(null)
                }
            }
            else
            {
                this.head = null
            }
        }
        //Only left child
        else if (!nodeToDelete.hasRight())
        {
            let closestLeftChild = nodeToDelete.getLeft()
            let second = null
            while (closestLeftChild.hasRight())
            {
                second = closestLeftChild
                closestLeftChild = closestLeftChild.getRight()
            }

            if (parentNode != null)
            {
                parentNode.setLeft(closestLeftChild)
            }
            else
            {
                this.head = closestLeftChild
            }
            if (second != null){
                closestLeftChild.setLeft(nodeToDelete.getLeft())
                second.setRight(null)
            }
        }
        //Only right child
        else if (!nodeToDelete.hasLeft())
        {
            let closestRightChild = nodeToDelete.getRight()
            let second = null
            while (closestRightChild.hasLeft())
            {
                second = closestRightChild
                closestRightChild = closestRightChild.getLeft()
            }

            if (parentNode!= null)
            {
                parentNode.setRight(closestRightChild)
            }
            else
            {
                this.head = closestRightChild
            }
            if (second != null){
                closestRightChild.setRight(nodeToDelete.getRight())
                second.setLeft(null)
            }
        }
        //Both children
        else
        {
            let closestRightChild = nodeToDelete.getRight()
            let second = null
            while (closestRightChild.hasLeft())
            {
                second = closestRightChild
                closestRightChild = closestRightChild.getLeft()
            }

            if (parentNode != null)
            {
                if (parentNode.data > nodeToDelete.data)
                {
                    parentNode.setLeft(closestRightChild)
                }
                else
                {
                    parentNode.setRight(closestRightChild)
                }
            }
            else
            {
                this.head = closestRightChild
            }
            if (second != null){
                closestRightChild.setRight(nodeToDelete.getRight())
                second.setLeft(null)
            }
            closestRightChild.setLeft(nodeToDelete.getLeft())
        }
        this.size -= 1
    }

    levelOrder(callback)
    {
        if (typeof callback != 'function')
        {
            throw new Error("Expected function, got " + typeof callback)
        }
        if (callback == null)
        {
            throw new Error("Callback function is null")
        }

        let arr = [this.head]
        while (arr.length != 0)
        {
            let current = arr[0]
            if (current.hasLeft())
            {
                arr.push(current.getLeft())
            }
            if (current.hasRight())
            {
                arr.push(current.getRight())
            }
            callback(current)
            arr.shift()
        }
    }

    inOrder(callback)
    {
        this.#inOrderRecurse(callback, this.head)
    }

    #inOrderRecurse(callback, currNode)
    {
        if (currNode.hasLeft())
        {
            this.#inOrderRecurse(callback, currNode.getLeft())
        }
        callback(currNode)
        if (currNode.hasRight())
        {
            this.#inOrderRecurse(callback, currNode.getRight())
        }
    }

    preOrder(callback)
    {
        this.#preOrderRecurse(callback, this.head)
    }

    #preOrderRecurse(callback, currNode)
    {
        callback(currNode)
        if (currNode.hasLeft())
        {
            this.#preOrderRecurse(callback, currNode.getLeft())
        }
        if (currNode.hasRight())
        {
            this.#preOrderRecurse(callback, currNode.getRight())
        }
    }

    postOrder(callback)
    {
        this.#postOrderRecurse(callback, this.head)
    }

    #postOrderRecurse(callback, currNode)
    {
        if (currNode.hasLeft())
        {
            this.#postOrderRecurse(callback, currNode.getLeft())
        }
        if (currNode.hasRight())
        {
            this.#postOrderRecurse(callback, currNode.getRight())
        }
        callback(currNode)
    }
}

let x = new BinarySortTree([1,2,3,4,5,6,7,8,9], true)
console.log(x.has(4))
console.log(x.has(23))
console.log(x.has(23))
x.deleteItem(5)
console.log(x)
x.insertItem(5)
console.log(x)
console.log(x.findItem(4))
console.log("done")

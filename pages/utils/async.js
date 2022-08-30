const createBusinessAccount = async (details, graphql, toast, router) => {
  try {
    const { data } = await graphql({
      variables: {
        input: details,
      },
    });

    if (data && data.registerOwner && data.registerOwner.success) {
      toast.success(data.registerOwner.message);
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};
const createNormalAccount = async (details, graphql, toast, router) => {
  try {
    const { data } = await graphql({
      variables: {
        input: details,
      },
    });

    if (data && data.registerUser && data.registerUser.success) {
      toast.success(data.registerUser.message);
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

const loginBusinessAccount = async (details, graphql, toast, router) => {
  try {
    const { data } = await graphql({
      variables: {
        input: details,
      },
    });

    if (data && data.loginOwner && data.loginOwner.success) {
      toast.success(data.loginOwner.message);
      router.push("/");
    } else {
      toast.error(data.loginUser.message);
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};
const loginNormalAccount = async (details, graphql, toast, router) => {
  try {
    const { data } = await graphql({
      variables: {
        input: details,
      },
    });

    if (data && data.loginUser && data.loginUser.success) {
      toast.success(data.loginUser.message);
      router.push("/");
    } else {
      toast.error(data.loginUser.message);
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

module.exports = {
  createBusinessAccount,
  createNormalAccount,
  loginBusinessAccount,
  loginNormalAccount,
};
